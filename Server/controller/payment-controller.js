// paymentRoutes.js
const Order = require('../schema/payment-schema.js');
const Razorpay = require('razorpay');
const Cart = require('../schema/cart-schema.js');

const razorpay = new Razorpay({
  key_id: 'rzp_test_weDYKOfqeCqi7Y',
  key_secret: 'UPMONZtlPDOSgVSTrQX2HKmb'
});

const RazorOrder = async (req, res) => {
    console.log("Received request to create Razorpay order");
  const { amount } = req.body;

  try {
    const amountInPaise = parseInt(amount) * 100;

    if (amountInPaise > 50000000) {
      return res.status(400).json({
        error: 'Amount exceeds Razorpay max limit of ₹5,00,000'
      });
    }
    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating Razorpay order');
  }
};

const OrderSave =  async (req, res) => {
    console.log('Saving order:', req.body);
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save order' });
  }
};

const deleteOrder = async (req, res) => {
  const { mobile } = req.params;
  try {
    await Cart.deleteMany({ mobile });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};


module.exports = { RazorOrder,OrderSave, deleteOrder }
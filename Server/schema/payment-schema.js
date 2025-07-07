const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  mobile: String,
  amount: Number,
  method: String,
  paymentId: String,
  orderId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../Pages/footer';
import axios from 'axios';

const Payment = () => {
  const { state } = useLocation();
  const { total, mobile } = state || {};
  const navigate = useNavigate();

  // ✅ Razorpay script inject
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // ✅ Success Handler
  const handlePaymentSuccess = async (response) => {
    try {
      await axios.post('http://localhost:8000/order', {
        mobile,
        amount: total,
        method: 'Online',
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id
      });

      await axios.delete(`http://localhost:8000/cart/clear/${mobile}`);

      alert('✅ Payment Successful!');
      navigate('/');
    } catch (err) {
      console.error('❌ Post-payment error:', err);
      alert('Error saving order or clearing cart.');
    }
  };

  // ✅ Razorpay Payment
  const handleRazorpay = async () => {
    try {
      const res = await axios.post('http://localhost:8000/payment/order', { amount: total });
      const { id, amount, currency } = res.data;

      const options = {
        key: 'rzp_test_weDYKOfqeCqi7Y', // ✅ Replace with your real Razorpay Key ID
        amount,
        currency,
        order_id: id,
        name: 'ShubhKart',
        description: 'Order Payment',
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: '',
          email: '',
          contact: mobile
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Razorpay Error:', err);
      alert('Failed to initiate payment');
    }
  };

  // ✅ Cash On Delivery
  const handleCOD = async () => {
    try {
      await axios.post('http://localhost:8000/order', {
        mobile,
        amount: total,
        method: 'Cash on Delivery',
        paymentId: 'COD',
        orderId: 'COD'
      });

      await axios.delete(`http://localhost:8000/cart/clear/${mobile}`);
      alert('🛒 Order Placed with Cash on Delivery!');
      navigate('/');
    } catch (err) {
      console.error('❌ COD Order Error:', err);
      alert('Error processing COD order.');
    }
  };

  return (
     <>
          <Navbar />
    <div className="container my-5">
      <div className="row g-4">
        {/* Payment Options */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header fw-bold fs-5">Select Payment Method</div>
            <div className="list-group list-group-flush">
              <button className="list-group-item list-group-item-action" onClick={handleRazorpay}>
                Pay With Razorpay (Pay ₹{total})
              </button>
              <button className="list-group-item list-group-item-action" onClick={handleCOD}>
                 Cash on Delivery
              </button>
              <button className="list-group-item list-group-item-action" disabled>
                UPI 
              </button>
              <button className="list-group-item list-group-item-action" disabled>
                Credit/Debit Card Payment
              </button>
              <button className="list-group-item list-group-item-action" disabled>
                 Net Banking 
              </button>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body">
              <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Amount</span>
                <span>₹{total}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mt-3">
                <span>Total Payable</span>
                <span>₹{total}</span>
              </div>
              <div className="text-success mt-2">
                💰 Safe & Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          <Footer />
    </>
  );
};

export default Payment;

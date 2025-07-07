// ✅ Updated Cart.jsx with quantity, database sync, and localStorage removal
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../Pages/footer';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [coupon] = useState(() => Math.floor(Math.random() * 200) + 1);

  // ✅ Fetch cart from DB
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return navigate('/login');
      try {
        const res = await axios.get(`http://localhost:8000/cart/${user.mobile}`);
        setCartItems(res.data.items);
        setLoading(false);
        localStorage.removeItem('selectedProduct');
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    };
    fetchCart();
  }, [navigate, user]);

  // ✅ Update quantity
  const updateQty = async (productId, delta) => {
    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updatedItems);
    try {
      await axios.put(`http://localhost:8000/cart/update/${user.mobile}`, {
        productId,
        delta
      });
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeItem = async (productId) => {
    const filtered = cartItems.filter(item => item.productId !== productId);
    setCartItems(filtered);
    try {
      console.log("Trying to delete:", user.mobile, productId);

      await axios.delete(`http://localhost:8000/cart/delete/${user.mobile}/${productId}`);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  

  if (loading) return <h3 className="text-center mt-5">Loading cart...</h3>;
  if (cartItems.length === 0) return <h3 className="text-center mt-5">No items in your cart.</h3>;

  const totalOriginal = cartItems.reduce((sum,item) => sum + (item.aprice * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + ((item.aprice - item.dprice) * item.quantity), 0);
  const platformFee = 3;
  const total = cartItems.reduce((sum, item) => sum + (item.dprice * item.quantity), 0) - coupon + platformFee;
  const PlaceOrder = () => {
    navigate('/address', {
    state: {
      name: user.name,
      mobile: user.mobile,
      totalOriginal,
      totalDiscount,
      coupon,
      platformFee,
      total
    }
  });
};
  return (
    <>
      <Navbar />

    <div className="container mt-4">
      <h4 className="mb-4">Shopping Cart</h4>
      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div className="card mb-3" key={item.productId}>
              <div className="row g-0 align-items-center">
                <div className="col-md-4 text-center">
                  <img
                    src={`http://localhost:8000/uploads/${item.image}`}
                    alt={item.name}
                    className="img-fluid p-2"
                    style={{ maxHeight: '150px', objectFit: 'contain' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.pname}</h5>
                    <p className="card-text text-muted">Seller: Demo Seller</p>
                    <p className="card-text">
                      <span className="text-danger fw-bold">₹{item.dprice}</span>
                      <span className="text-muted ms-2 text-decoration-line-through">₹{item.aprice}</span>
                      <span className="text-success ms-2">
                        ({Math.floor(((item.aprice - item.dprice) * 100) / item.aprice)}% Off)
                      </span>
                    </p>
                    <div className="d-flex align-items-center gap-3 mt-2">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQty(item.productId, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQty(item.productId, 1)}>+</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.productId)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
              <div className="d-flex justify-content-between">
                <p>Price ({cartItems.length} item)</p>
                <p>₹{totalOriginal}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Discount</p>
                <p className="text-success">-₹{totalDiscount}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Coupons for you</p>
                <p className="text-success">-₹{coupon}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Platform Fee</p>
                <p>₹{platformFee}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <p>Total Amount</p>
                <p>₹{total}</p>
              </div>
              <p className="text-success mt-2">
                You will save ₹{totalDiscount + coupon} on this order
              </p>
              <button className="btn btn-primary w-100 mt-3 fw-bold" onClick={PlaceOrder}>PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='mt-4'>
          <Footer />
          </div>
    
    </>
  );
};

export default Cart;

import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Image from '../assets/login/login bg.jpg';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { addRegistration } from '../service/api';

const Register = () => {
  const [register, setRegister] = useState({
    name: '',
    mobile: '',
    password: '',
    cpassword: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from || '/cart';
  const product = location.state?.product || JSON.parse(localStorage.getItem('selectedProduct'));
  const validName = useRef(null);

  const onValueChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    // ✅ Client-side validations
    if (!register.name) {
      alert('Enter your name');
    } else if (!register.mobile) {
      alert('Enter your mobile!');
    } else if (register.mobile.length !== 10) {
      alert('Enter a valid 10-digit mobile number');
    } else if (!register.password) {
      alert('Enter your password');
    } else if (register.password.length < 8) {
      alert('Password must be at least 8 characters');
    } else if (!register.cpassword) {
      alert('Enter your confirm password');
    } else if (register.cpassword !== register.password) {
      alert('Passwords do not match');
    } else {
      try {
        const res = await addRegistration(register);

        if (res.status === 201) {
          alert(res.data.message || 'Registration successful');

          const user = {
            name: register.name,
            mobile: register.mobile,
            token: res.data.token || '', // ✅ store token if available
          };

          localStorage.setItem('user', JSON.stringify(user));

          // ✅ If coming from cart with product
          if (fromPath === '/cart' && product) {
            try {
              await axios.post('http://localhost:8000/cart/add', {
                mobile: user.mobile,
                name: user.name,
                product: {
                  productId: product._id || product.id,
                  pname: product.pname,
                  dprice: product.dprice,
                  aprice: product.aprice,
                  image: product.image,
                  quantity: 1,
                },
              });

              console.log('✅ Product added to cart');
              localStorage.removeItem('selectedProduct');
              navigate('/cart');
            } catch (cartError) {
              console.log('Error adding to cart:', cartError);
              alert('Product could not be added to cart');
              navigate('/cart');
            }
          } else {
            navigate(fromPath);
          }

          // ✅ Reset form
          setRegister({
            name: '',
            mobile: '',
            password: '',
            cpassword: '',
          });

        } else {
          alert('Something went wrong during registration');
        }
      } catch (error) {
        console.error('❌ Registration Error:', error);
        if (error.response && error.response.status === 409) {
          alert('Mobile number already registered');
        } else if (error.response && error.response.status === 400) {
          alert(error.response.data.error || 'Invalid data');
        } else {
          alert('Server error. Please try again later.');
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="auth-container"
        style={{
          backgroundImage: `url(${Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="auth-box">
          <h2>Register</h2>
          <form onSubmit={submitData}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              ref={validName}
              value={register.name}
              onChange={onValueChange}
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={register.mobile}
              onChange={onValueChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={register.password}
              onChange={onValueChange}
              required
            />
            <input
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              value={register.cpassword}
              onChange={onValueChange}
              required
            />
            <button type="submit" className="auth-button">
              Register
            </button>
          </form>

          <div className="auth-divider">or</div>
          <button className="social-btn google">Login with Google</button>
          <button className="social-btn facebook">Login with Facebook</button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

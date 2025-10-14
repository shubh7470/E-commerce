import React , {useState} from 'react';
import { Link,useNavigate, useLocation } from 'react-router-dom';
import bgImage from '../assets/login/login bg.jpg';
import Navbar from '../components/Navbar';
import axios from 'axios';



const LoginPage = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const fromPath = location.state?.from || '/';
  const product = location.state?.product || JSON.parse(localStorage.getItem('selectedProduct'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submit clicked");
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/userlogin`, { 
        Mobile: mobile,
        password: password,
      });
      console.log("✅ Login Response:", data);
      setMessage(data.message);
      console.log("Response:", data); // 👈 yeh print ho raha kya
      // ✅ Store user info
      const user = {
        name: data.name,
        mobile: data.mobile,
        token: data.token,
      };
      localStorage.setItem('user', JSON.stringify(user));
      console.log(" User Saved in LocalStorage:", user);
      
      if (fromPath === '/cart' && product) {
        console.log(" Inside cart add condition", product);
         await axios.post(`${import.meta.env.VITE_API_URL}/cart/add`, {
           mobile: user.mobile,
           name: user.name,
           product: {
           productId: product._id || product.id,  
           pname: product.pname,
           dprice: product.dprice,
           aprice:product.aprice,
           image: product.image,
           quantity: 1
    } 
        });
        console.log("✅ Product added to cart");

        localStorage.removeItem('selectedProduct');
        navigate('/cart');
      } else {
        navigate(fromPath);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Something went wrong'
      );
    }
  };


 return (
    <>
      <Navbar />
      <div
        className="auth-container"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="auth-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="Enter your Mobile no."
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="auth-extra">
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>
          </form>

          {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

          <div className="auth-divider">or</div>

          <button className="social-btn google">Login with Google</button>
          <button className="social-btn facebook">Login with Facebook</button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </>
  );
};


export default LoginPage;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/adminlogin`, { username, password });

      console.log(username, password);
      setMessage(data.message);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setMessage(
        error.response?.status === 401
          ? 'Invalid username or password'
          : error.response?.data?.error || 'Something went wrong'
      );
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-md-4'></div>
        <div className='col-12 col-md-4'>
          <div className='form p-3'>
            <form onSubmit={handleSubmit}>
              <h5 className='text-center'>Login</h5>
              <hr />
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="email"
                  name="username"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='text-center mt-3'>
                <button type="submit" className='btn btn-primary'>Login</button>
              </div>
            </form>
            {message && <p className="text-center mt-3 text-danger">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

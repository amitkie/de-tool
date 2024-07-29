// src/components/Login/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../features/user/userSlice';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token, userInfo, error: loginError } = useSelector((state) => state.user);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (token) {
      navigate('/home'); // Replace '/home' with your actual home route
    }
  }, [token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    dispatch(loginRequest({ email, password }));
  };

  // Redirect to home after successful login
  useEffect(() => {
    if (!loading && token) {
      navigate('/home'); // Replace '/home' with your actual home route
    }
  }, [loading, token, navigate]);

  return (
    <div className="box">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        <div className="inputBox">
          <input 
            type="text" 
            required="required" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <span>Username</span>
          <i></i>
        </div>
        <div className="inputBox">
          <input 
            type="password" 
            required="required" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <span>Password</span>
          <i></i>
        </div>
        <div className="links">
          <a href="#"></a>
          <a href="#">Signup</a>
        </div>
        {loading && <p>Loading...</p>}
        {loginError && <p className="error">{loginError}</p>}
        {/* {token && <p>Welcome, {user.username}!</p>} */}
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;

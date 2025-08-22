import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <div className="auth-image-content">
          <img src="/assets/images/auth-image.svg" alt="Welcome" />
          <h1>Welcome Back</h1>
          <p>Sign in to access your personalized dashboard and continue your journey with us.</p>
        </div>
      </div>
      <div className="auth-form-container">
        <form onSubmit={submitHandler} className="auth-form">
          <h2>Login</h2>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">Sign In</button>
          <a href="/register" className="auth-link">
            Don't have an account? Register now
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
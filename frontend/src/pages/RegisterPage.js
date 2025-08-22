import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <div className="auth-image-content">
          <img src="/assets/images/auth-image.svg" alt="Join Us" />
          <h1>Join Our Community</h1>
          <p>Create an account to unlock exclusive features and personalized content.</p>
        </div>
      </div>
      <div className="auth-form-container">
        <form onSubmit={submitHandler} className="auth-form">
          <h2>Register</h2>
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="auth-button">Create Account</button>
          <a href="/login" className="auth-link">
            Already have an account? Sign in
          </a>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
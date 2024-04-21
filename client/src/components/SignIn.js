import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../services/UserContext'; // Correct import path as necessary

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleSignIn, authError } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleSignIn(email, password);
    if (!authError) {
      onClose();
      navigate("/admin");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="button" className="close-button" onClick={onClose}>X</button>
        <button type="submit">Sign In</button>
        {authError && <div className="auth-error-message">{authError}</div>}
      </form>
    </div>
  );
};

export default SignIn;
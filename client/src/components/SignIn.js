import React from 'react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const SignIn = ({ onClose }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      onClose();
      navigate("/admin")
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSignIn}>
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
        <button className="signin-close-button" onClick={onClose}>x</button>
        <button type="submit">Sign In</button>
      </form>

    </div>
  );
};

export default SignIn;
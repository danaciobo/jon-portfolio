import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../services/UserContext';

const SignOut = () => {

    const navigate = useNavigate();

    const { handleSignOut } = useAuth();

    const handleSignOutNavigate = async () => {

      handleSignOut()
      navigate("/")
    }

  return (
    <button id="sign-out-button" onClick={handleSignOutNavigate}>Sign Out</button>
  )


  }


export default SignOut;
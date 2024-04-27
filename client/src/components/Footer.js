import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useAuth } from "../services/UserContext"; // Make sure this matches the actual export

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth(); // Using currentUser to conditionally render Admin link
  const navigate = useNavigate();

  const handleAdminClick = () => {
    if (currentUser) {
      navigate("/admin"); // Redirect to Admin page if user is signed in
    } else {
      setShowModal(true); // Show SignIn modal if user is not signed in
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="footer-container">
      <div className="footer-text">© Jon Lane 2024 | website created by dana_ciobo</div>

      <div className="footer-admin-area">
        <div onClick={handleAdminClick}>Admin</div>

        {showModal && <SignIn onClose={closeModal} />}
        {currentUser && <SignOut />}
      </div>
    </div>
  );
};

export default Footer;

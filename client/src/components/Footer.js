import React, { useState }  from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
const Footer = () => {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="footer-container">
      <div className="footer-text">© Jon Lane 2024 | website created by dana_ciobo</div>
      <div onClick={toggleModal}>Admin</div>
      {showModal && <SignIn onClose={toggleModal} />}
    </div>
  )
}

export default Footer;

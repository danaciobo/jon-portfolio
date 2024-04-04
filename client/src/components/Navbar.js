import React from "react";
import {useState} from 'react';
import { Link } from "react-router-dom";
import jontz from '../JonLane.png';
import citizenjontz from '../CitizenLane.png';

const Navbar = () => {

  const [logo, setLogo] = useState(jontz);

  const handleLogoClick = () => {
    setLogo((prevLogo) => (prevLogo === jontz? citizenjontz : jontz))
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo-container">
          <Link to="/">
            <img src={logo} className="logo-image" alt="logo" onClick={handleLogoClick} />
          </Link>
        </div>

        <ul className="navbar-list">
          <li>
            <Link to="/" className="navbar-link">HOME </Link>
          </li>

          <li>
            <Link to="/work" className="navbar-link">WORK</Link>
          </li>

          <li>
            <Link to="/contact" className="navbar-link">CONTACT</Link>
          </li>
        </ul>

      </div>
    </nav>







  )
}

export default Navbar;
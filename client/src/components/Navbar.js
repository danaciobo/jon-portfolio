import React from "react";
import jontz from '../jontz.webp';

const Navbar = () => {
  return(
      <nav className = "navbar">
        <div className = "navbar-container">

          <div className = "logo">
            <a href="/">
              <img src={jontz} className="logo" alt="logo" />
            </a>
          </div>

          <ul className = "navbar-list">
            <li>HOME</li>
            <li>WORK</li>
            {/* <li>Art</li>
            <li>Design</li>
            <li>Music</li>
            <li>Furniture</li> */}
            <li>CONTACT</li>
          </ul>

        </div>
      </nav>







  )
}

export default Navbar;
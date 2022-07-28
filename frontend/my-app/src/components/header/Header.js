import React from "react";
import { Link } from "react-router-dom";
import medicine from "../../pages/medicine/Medicine";
import MedicineImage from "../../images/Medicine Finder.png";
import "./Header.css";

function Header() {
  return (
    <div className="HeaderPage">
      <nav className="navigation">
        <a href="#" className="logo">
          Medicine<span>Finder</span>
        </a>

        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label for="menu-btn" className="menu-icon">
          <span className="nav-icon"></span>
        </label>

        <ul className="menu">
          <li>
            <Link className="header_link active" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header_link" to="/medicine">
              Medicine
            </Link>
          </li>
          <li>
            <Link className="header_link" to="/aboutus">
              AboutUs
            </Link>
          </li>

          <div className="headerLogin">
            <Link className="header_link" to="/login">
              <button>login</button>
            </Link>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;

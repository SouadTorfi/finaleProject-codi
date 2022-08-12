import React from "react";
import { Link } from "react-router-dom";
import medicine from "../../pages/medicine/Medicine";
import MedicineImage from "../../images/Medicine Finder.png";
import "./Header.css";

function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href("/");
  };
  return (
    <div className="HeaderPage">
      <nav className="navigation">
        <a href="/" className="logo">
          Medicine<span>Finder</span>
        </a>

        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label for="menu-btn" className="menu-icon">
          <span className="nav-icon"></span>
        </label>

        <ul className="menu">
          {localStorage.getItem("token") ? (
            <>
              <li>
                <Link className="header_link active" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="header_link active" to="/userproduct">
                  MyProduct
                </Link>
              </li>
              <li>
                <Link className="header_link active" to="/myprofile">
                  Profile
                </Link>
              </li>
              <div className="headerLogin">
                <Link to="/" className="header_link" onClick={() => logout()}>
                  <button>Logout</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;

import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaAlignJustify,
} from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import axios from "axios";

function Dashbaord() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href("/");
  };


  return (
    <div className="dashboard-page">
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar-brand">
          <h1>
            <a href="#" className="logo-dashbaord">
              Medicine<span>Finder</span>
            </a>
          </h1>
        </div>

        <div className="sidebar-menu">
          <ul>
            {/* <li className="li-dashbaord">
              <Link to="/dashboard">
                <span>
                  <b>
                    <FaTachometerAlt />
                  </b>{" "}
                  Dashboard
                </span>
              </Link>
            </li> */}
            <li className="li-dashbaord">
              <Link to="/dashboard/admins">
                <span>
                  {" "}
                  <b>
                    <FaUser />
                  </b>{" "}
                  Admins
                </span>
              </Link>
            </li>
            <li className="li-dashbaord">
              <Link to="/dashboard/users">
                <span>
                  <b>
                    {" "}
                    <FaUsers />
                  </b>{" "}
                  Users
                </span>
              </Link>
            </li>
            <li className="li-dashbaord">
              <Link to="/dashboard/products">
                <span>
                  <b>
                    <GiMedicines />
                  </b>{" "}
                  Product
                </span>
              </Link>
            </li>
            <li className="li-dashbaord">
              <Link to="/dashboard/aboutus">
                <span>
                  <b>
                    <HiOutlineUsers />
                  </b>{" "}
                  AboutUs
                </span>
              </Link>
            </li>
            <li className="li-dashbaord">
              <Link
                to="/admin/login"
                className="header_link"
                onClick={() => logout()}
              >
                <span>
                  {" "}
                  <b>
                    {" "}
                    <FaSignOutAlt />
                  </b>{" "}
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <header>
          <label for="nav-toggle">
            <span className="fas fa-bars">
              <FaAlignJustify />
            </span>
          </label>

        

          {/* <div className="user-wrapper">
            <img
              src="https://bit.ly/3bvT89p"
              width="40px"
              height="40px"
              alt="profile-img"
            />
            <div className="">
              <h4>Souad Torfi</h4>
              <small>Admin</small>
            </div>
          </div> */}
        </header>
      </div>
    </div>
  );
}

export default Dashbaord;

import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./Profile.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loader/Loader";

function Profile() {
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/user/${id}`)
      .then((res) => {
        setState(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      <Header />
      <div className="ProfileLoader">
      {loading ? (
          <Loading />
        ) : (
          <>
      <div className="user-profile-container">
        <div className="user-profile">
          <h1>{state.name}</h1>
          <div className="profile-user-underline"></div>
          <div className="user-attributes">
            <h3>
              Email: <span>{state.email}</span>
            </h3>
            <br></br>
            <h3>
              Address: <span>{state.address}</span>
            </h3>
            <br></br>
            <h3>
              Phone: <span>{state.phone}</span>
            </h3>
            <br></br>
            {/* <h3>Password: <span>{state.password}</span></h3> */}
          </div>
          <div className="update">
            <div className="opacity">
              <Link to={"/editprofile/" + id}>
                <button>Update</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      </>
      )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

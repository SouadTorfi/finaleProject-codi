import React from "react";
import "./EditProfile.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function EditProfile() {
  toast.configure();
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleuser(id);
    }
  }, [id]);
  const getSingleuser = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/user/${id}`);

    if (response.status === 200) {
      setState({ ...response.data });
    }
  };

  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
      email: state.email,
      address: state.address,
      phone: state.phone,
      password: state.password,
    };
    axios
      .put(`http://localhost:3000/api/user/${id}`, data)
      .then((res) => {
        setState({
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        toast.success("My Profile Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating my profile");
      });
  };

  return (
    <div>
      <Header/>
      <div>
        {" "}
        <div id="edit-profile-user-container" onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>
          <div className="edit-profile-user-underline"></div>
          <form id="edit-profile-user_form">
            <div className="edit-profile-user-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                id="name_input"
                onChange={handleChange}
                value={state.name}
                required
              />
            </div>

            <div className="edit-profile-user-telephone">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your number"
                name="phone"
                id="telephone_input"
                onChange={handleChange}
                value={state.phone}
                required
              />
            </div>
            <div className="edit-profile-user-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your password"
                name="password"
                id="password_input"
                onChange={handleChange}
                value={state.password}
                required
              />
            </div>
            <div className="edit-profile-user-telephone">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Your address"
                name="address"
                id="address_input"
                onChange={handleChange}
                value={state.address}
                required
              />
            </div>
            <div className="edit-profile-user-email">
              <label for="email"></label>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                id="email_input"
                onChange={handleChange}
                value={state.email}
                required
              />
            </div>
            <div className="edit-profile-user-submit">
              <input
                type="submit"
                value="save change"
                id="form_button-edit-profile-user"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
export default EditProfile;

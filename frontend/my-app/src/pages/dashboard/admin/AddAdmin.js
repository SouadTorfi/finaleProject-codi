import React from "react";
import "./AddAdmin.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAdmin() {
  toast.configure();
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

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
      .post(`http://localhost:3000/api/admin/signup`, data)
      .then((res) => {
        console.log(res.data.response);
        setState({
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        toast.success("Admin added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While adding Admin");
      });
  };

  return (
    <div>
      <div className="add-admin">
        {" "}
        <div id="addAdmin-container" onSubmit={handleSubmit}>
          <h1>Add Admin</h1>
          <div className="addAdmin-underline"></div>
          <form id="addAdmin_form">
            <div className="addAdmin-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name_input"
                onChange={handleChange}
                value={state.name}
                required
              />
            </div>

            <div className="addAdmin-telephone">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Number"
                name="phone"
                id="telephone_input"
                onChange={handleChange}
                value={state.phone}
                required
              />
            </div>
            <div className="addAdmin-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Password"
                name="password"
                id="password_input"
                onChange={handleChange}
                value={state.password}
                required
              />
            </div>
            <div className="addAdmin-telephone">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Address"
                name="address"
                id="address_input"
                onChange={handleChange}
                value={state.address}
                required
              />
            </div>
            <div className="addAdmin-email">
              <label for="email"></label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email_input"
                onChange={handleChange}
                value={state.email}
                required
              />
            </div>
            <div className="addAdmin-submit">
              <input type="submit" value="Add" id="form_button-addAdmin" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddAdmin;

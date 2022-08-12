import React from "react";
import "./EditAdmin.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function EditAdmin() {
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
      getSingleAdmin(id);
    }
  }, [id]);
  const getSingleAdmin = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/admin/${id}`);

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
      .put(`http://localhost:3000/api/admin/${id}`, data)
      .then((res) => {
        console.log(res.data.response);
        setState({
          name: "",
          email: "",
          address: "",
          phone: "",
          password: "",
        });
        toast.success("Admin Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Admin");
      });
  };

  return (
    <div className="edit-admin">
      <div>
    
        {" "}
        <div id="editAdmin-container" onSubmit={handleSubmit}>
          <h1>Edit Admin</h1>
          <div className="editAdmin-underline"></div>
          <form id="editAdmin_form">
            <div className="editAdmin-name">
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

            <div className="editAdmin-telephone">
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
            <div className="editAdmin-name">
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
            <div className="editAdmin-telephone">
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
            <div className="editAdmin-email">
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
            <div className="editAdmin-submit">
              <input
                type="submit"
                value="save change"
                id="form_button-editAdmin"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditAdmin;

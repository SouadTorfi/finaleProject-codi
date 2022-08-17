import React from "react";
import "./Addcategory.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddCategory() {
  toast.configure();
  const [state, setState] = useState({
    name: "",
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
    };
    axios
      .post(`http://localhost:3000/api/category`, data)
      .then((res) => {
        console.log(res.data.response);
        setState({
          name: "",
        });
        toast.success("Category added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While adding Category");
      });
  };

  return (
    <div>
      <div className="add-Category">
        {" "}
        <div id="addCategory-container" onSubmit={handleSubmit}>
          <h1>Add Category</h1>
          <div className="addCategory-underline"></div>
          <form id="addCategory_form">
            <div className="addCategory-name">
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

            <div className="addCategory-submit">
              <input type="submit" value="Add" id="form_button-addCategory" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddCategory;

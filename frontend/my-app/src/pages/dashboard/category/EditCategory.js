import React from "react";
import "./EditCategory.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditCategory() {
  toast.configure();
  const [state, setState] = useState({
    name: "",
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleCategory(id);
    }
  }, [id]);
  const getSingleCategory = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/category/${id}`
    );

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
    };
    axios
      .put(`http://localhost:3000/api/category/${id}`, data)
      .then((res) => {
        console.log(res.data.response);
        setState({
          name: "",
        });
        toast.success("Category Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Updating Category");
      });
  };

  return (
    <div className="edit-Category">
      <div>
        {" "}
        <div id="editCategory-container" onSubmit={handleSubmit}>
          <h1>Edit Category</h1>
          <div className="editCategory-underline"></div>
          <form id="editCategory_form">
            <div className="editCategory-name">
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

            <div className="editCategory-submit">
              <input
                type="submit"
                value="save change"
                id="form_button-editCategory"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditCategory;

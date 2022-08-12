import React from "react";
import "./AddMedicine.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function AddMedicine() {
  toast.configure();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await axios
      .get(`http://localhost:3000/api/category`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [state, setState] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
    expiredDate: "",
    user_id: localStorage.getItem("id"),
    category_id: "",
  });
  const [image, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const image_array = Object.values(image.image);
    const formData = new FormData();
    image_array.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("name", state.name);
    formData.append("quantity", state.quantity);
    formData.append("price", state.price);
    formData.append("description", state.description);
    formData.append("expiredDate", state.expiredDate);
    formData.append("user_id", state.user_id);
    formData.append("category_id", state.category_id);

    axios
      .post(`http://localhost:3000/api/medicine`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res ", res.data);
        toast.success("Medicine Added Successfulyy");
        setImages({
          image: "",
        });
        setState({
          name: "",
          quantity: "",
          price: "",
          description: "",
          expiredDate: "",
          // user_id: "",
          category_id: "",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Adding Medicine");
      });
  };
  const handleImage = (e) => {
    console.log("handleImage ", e.target.files);
    setImages({ image: e.target.files });
  };
  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <Header />
      <div>
        {" "}
        <div id="addmedicine-user-container" onSubmit={handleSubmit}>
          <h1>Add Medicine</h1>
          <div className="addmedicine-user-underline"></div>
          <form id="addmedicine-user_form">
            <div className="addmedicine-user-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                onChange={handleChange}
                value={state.name}
                required
              />
            </div>

            <div className="addmedicine-user-leftSide">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Quantity"
                name="quantity"
                id="quantity"
                onChange={handleChange}
                value={state.quantity}
                required
              />
            </div>
            <div className="addmedicine-user-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="Price"
                name="price"
                id="price"
                onChange={handleChange}
                value={state.price}
                required
              />
            </div>
            <div className="addmedicine-user-leftSide">
              <label for="name"></label>
              <input
                type="text"
                placeholder="ExpiredDate xx/x/xxxx"
                name="expiredDate"
                id="expiredDate"
                onChange={handleChange}
                value={state.expiredDate}
                required
              />
            </div>
            <div className="addmedicine-user-name">
              <label for="name"></label>
              <input
                type="text"
                placeholder="User"
                name="user_id"
                id="user_id"
                disabled
                // onChange={handleChange}
                value={state.user_id}
                required
              />
            </div>
            <div className="addmedicine-user-hollSide">
              <label for="description"></label>
              <input
                type="text"
                placeholder="Description"
                name="description"
                id="description"
                onChange={handleChange}
                value={state.description}
                required
              />
            </div>
            <select
              className="select-category"
              name="category_id"
              onChange={handleChange}
              //   value={state.category_id}
            >
              <option>Select Category</option>
              {category.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>

            <div className="uploadButton">
              <input
                type="file"
                id="file"
                name="image"
                multiple
                onChange={handleImage}
                required
              />
            </div>
            <div className="addmedicine-user-submit">
              <input type="submit" value="Add" id="form_button-addmedicine-user" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AddMedicine;

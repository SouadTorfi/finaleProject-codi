import React from "react";
import "./EditMedicine.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

function EditMedicine() {
  toast.configure();

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSinglemedicine(id);
    }
  }, [id]);
  const getSinglemedicine = async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/medicine/${id}`
    );

    if (response.status === 200) {
      setState({ ...response.data });
      state.category_id = response.data.category_id._id;
    }
  };
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
    console.log("image", image.image);

    let image_array;
    let formData = new FormData();
    if (image.image != undefined) {
      console.log("uyuyuy");
      image_array = Object.values(image.image);
      image_array.forEach((file) => {
        formData.append("image", file);
        console.log("if ", file);
      });
    }

    formData.append("name", state.name);
    formData.append("quantity", state.quantity);
    formData.append("price", state.price);
    formData.append("description", state.description);
    formData.append("expiredDate", state.expiredDate);
    formData.append("user_id", state.user_id);
    formData.append("category_id", state.category_id._id);

    console.log("formdata ", formData);

    axios
      .put(`http://localhost:3000/api/medicine/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Medicine Edited Successfulyy");
        // setImages({
        //   image: [],
        // });
        // setState({
        //   name: "",
        //   quantity: "",
        //   price: "",
        //   description: "",
        //   expiredDate: "",
        //   user_id: "",
        //   category_id: "",
        // });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error While Editing Medicine");
      });
  };
  const handleImage = (e) => {
    console.log("handleImage ", e.target.files);
    setImages({ image: e.target.files });
  };
  const handleChange = (e) => {
    e.persist();
    let { name, value } = e.target;

    if (name == "category_id") {
      setState({ ...state, [name]: JSON.parse(value) });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  return (
    <div>
      <Header />
      <div>
        {" "}
        <div id="addmedicine-user-container" onSubmit={handleSubmit}>
          <h1>Edit Medicine</h1>
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
                name="user_id.name"
                id="user_id"
                disabled
                // onChange={handleChange}
                value={state.user_id.name}
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
              id="category_id"
              onChange={handleChange}
              required
              // value={JSON.stringify(state.category_id)}
            >
              <option>Select Category</option>
              {category &&
                category.map((item) => {
                  return (
                    <option
                      value={JSON.stringify(item)}
                      key={item._id}
                      label={item.name}
                      selected={
                        state.category_id._id == item._id ? "selected" : ""
                      }
                      required
                    >
                      {item.name}
                    </option>
                  );
                })}
            </select>

            <div className="ProductEditImageAll">
              {state.image &&
                state.image.map((singleImage) => {
                  return (
                    <div className="ProductEditImage">
                      <img src={singleImage} alt="I'm an image" />
                    </div>
                  );
                })}
            </div>
            <div className="uploadButton">
              <input
                type="file"
                id="file"
                name="image"
                multiple
                onChange={handleImage}
              />
            </div>
            <div className="addmedicine-user-submit">
              <input
                type="submit"
                value="Save Changes"
                id="form_button-addmedicine-user"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default EditMedicine;

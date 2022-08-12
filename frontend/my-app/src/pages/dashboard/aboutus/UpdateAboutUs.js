import React from "react";
import "./UpdateAboutUs.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateAboutUs() {
  toast.configure();
  const [image, setImages] = useState([]);
  const [state, setState] = useState({
    title1: "",
    paragraphe1: "",
    paragraphe2: "",
    paragraphe3: "",
    paragraphe4: "",
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getSingleAdmin(id);
    }
  }, [id]);
  const getSingleAdmin = async (id) => {
    const response = await axios.get(`http://localhost:3000/api/aboutus/${id}`);

    if (response.status === 200) {
      setState({ ...response.data });
    }
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

    formData.append("title1", state.title1);
    formData.append("paragraphe1", state.paragraphe1);
    formData.append("paragraphe2", state.paragraphe2);
    formData.append("paragraphe3", state.paragraphe3);
    formData.append("paragraphe4", state.paragraphe4);

    console.log("formdata ", formData);

    axios
      .put(`http://localhost:3000/api/aboutus/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("AboutUs Eddet Successfulyy");
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
        toast.error("Error While Editing AboutUs");
      });
  };
  return (
    <div className="edit-aboutus-dashboard">
      <div id="aboutusDashboard-container"  onSubmit={handleSubmit}>
        <h1>Edit AboutUs</h1>
        <div className="aboutusDashboard-underline"></div>
        <form id="contact_form">
          <div className="aboutusDashboard-email">
            <label for="title"></label>
            <input
              type="text"
              placeholder="Title"
              name="title1"
              id="title_input"
              onChange={handleChange}
              value={state.title1}
              required
            />
          </div>

          <div className="aboutusDashboard-message">
            <label for="message"></label>
            <textarea
              name="paragraphe1"
              placeholder="Paragraphe 1"
              id="message_input"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={state.paragraphe1}
              required
            ></textarea>
          </div>
          <div className="aboutusDashboard-message">
            <label for="message"></label>
            <textarea
              name="paragraphe2"
              placeholder="Paragraphe 2"
              id="message_input"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={state.paragraphe2}
              required
            ></textarea>
          </div>
          <div className="aboutusDashboard-message">
            <label for="message"></label>
            <textarea
              name="paragraphe3"
              placeholder="Paragraphe 3"
              id="message_input"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={state.paragraphe3}
              required
            ></textarea>
          </div>
          <div className="aboutusDashboard-message">
            <label for="message"></label>
            <textarea
              name="paragraphe4"
              placeholder="Paragraphe 4"
              id="message_input"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={state.paragraphe4}
              required
            ></textarea>
            <input
              className="image-aboutus-upload"
              type="file"
              id="myFile"
              name="image"
              multiple
              onChange={handleImage}
            />
          </div>
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
          <div className="aboutusDashboard-submit">
            <input
              type="submit"
              value="Save Change"
              id="form_button-aboutusDashboard"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAboutUs;

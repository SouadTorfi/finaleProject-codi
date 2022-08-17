import React from "react";
import { useState, useEffect } from "react";
import "./MedicineDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Moment from "moment";
import Loading from "../../components/loader/Loader";

function MedicineDetails() {
  let { id } = useParams();
  const formatDate = Moment().format("DD-MM-YYYY");

  const [medicineDetails, setMedicineDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/medicine//${id}`)
      .then((res) => {
        console.log("response ", res.data);
        setMedicineDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const imgs = document.querySelectorAll(".img-select a");
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  window.addEventListener("resize", slideImage);

  return (
    <div>
      <Header />
      <div className="UserProductLoader-medicine">
        {loading ? (
          <Loading />
        ) : (
          <>
      <div className="medicine-details">
        {console.log("formatDate ",formatDate)}
        <div className="product-details">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img
                  src={
                    medicineDetails?.image
                      ? medicineDetails.image[0]
                      : undefined
                  }
                />
                <img
                  src={
                    medicineDetails?.image
                      ? medicineDetails.image[1]
                      : undefined
                  }
                />
                <img
                  src={
                    medicineDetails?.image
                      ? medicineDetails.image[2]
                      : undefined
                  }
                />
                <img
                  src={
                    medicineDetails?.image
                      ? medicineDetails.image[3]
                      : undefined
                  }
                />
                <img
                  src={
                    medicineDetails?.image
                      ? medicineDetails.image[4]
                      : undefined
                  }
                />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <a href="#" data-id="1">
                  <img
                    className="img-item-img"
                    src={
                      medicineDetails?.image
                        ? medicineDetails.image[0]
                        : undefined
                    }
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="2">
                  <img
                    className="img-item-img"
                    src={
                      medicineDetails?.image
                        ? medicineDetails.image[1]
                        : undefined
                    }
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="3">
                  <img
                    className="img-item-img"
                    src={
                      medicineDetails?.image
                        ? medicineDetails.image[2]
                        : undefined
                    }
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="4">
                  <img
                    className="img-item-img"
                    src={
                      medicineDetails?.image
                        ? medicineDetails.image[3]
                        : undefined
                    }
                  />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="5">
                  <img
                    className="img-item-img"
                    src={
                      medicineDetails?.image
                        ? medicineDetails.image[4]
                        : undefined
                    }
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="product-content">
            <h2 className="product-title">{medicineDetails.name}</h2>
            <h4>
              posted on: {Moment(medicineDetails.createdAt).format("dddd/MM/YYYY")}
              
            </h4>

            <div className="product-price">
              <p className="new-price">
                Price: <span>${medicineDetails.price}</span>
              </p>
            </div>

            <div className="product-detail">
              <h2>about this medicine: </h2>
              <p>{medicineDetails.description}</p>
     
              <ul>
                <li>
                  Category:{" "}
                  <span>
                    {" "}
                    {medicineDetails && medicineDetails.category_id
                      ? medicineDetails.category_id.name
                      : "Medicine"}
                  </span>
                </li>
                <li>
                  Expiration Date: <span>{medicineDetails.expiredDate}</span>
                </li>
                <li>
                  Location:{" "}
                  <span>
                    {" "}
                    {medicineDetails && medicineDetails.user_id
                      ? medicineDetails.user_id.address
                      : "Address"}
                  </span>
                </li>
                <li>
                  Phone:{" "}
                  <span>
                    {" "}
                    {medicineDetails && medicineDetails.user_id
                      ? medicineDetails.user_id.phone
                      : "Phone"}
                  </span>
                </li>
                <li>
                  Quantity: <span>{medicineDetails.quantity}</span>
                </li>
              </ul>
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

export default MedicineDetails;

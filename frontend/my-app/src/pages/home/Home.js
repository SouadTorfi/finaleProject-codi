import React from "react";
import { useState, useEffect } from "react";
import Medicine1 from "../../images/Medicine1.png";
import Medicine2 from "../../images/MedicineCaracter.png";
import UserImage from "../../images/userImage.png";
import UserImage2 from "../../images/userImage2.png";
import UserImage3 from "../../images/userImage3.png";
import Brain from "../../images/Brain.png";
import Heart from "../../images/heart.png";
import Estomac from "../../images/Estomac.png";
import Hair from "../../images/Hair.png";
import Musle from "../../images/Musle.png";
import Blood from "../../images/blood.png";
import Nervese from "../../images/nervese.png";
import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [medicine, setMedicine] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getMedicines();
  }, []);

  const getMedicines = async () => {
    await axios
      .get(`http://localhost:3000/api/medicine/lastMedicines`)

      .then((res) => {
        setMedicine(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Header />
      <section id="search-banner">
        <img src={Medicine1} className="bg-1" alt="bg" />
        <div className="search-banner-text">
          <h1>Find Your medicine</h1>
          <strong>#Some Medicine free</strong>
          <form action="" className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search your medication"
              name="search"
              onChange={(e) => setSearchValue(e.target.value)}
              required
            />
            <i className="fa fa-search">
              <BiSearch />
            </i>
          </form>
        </div>
      </section>
      <section id="category">
        <div className="category-heading">
          <h2>categories</h2>
          {/* <span>All</span> */}
        </div>
      </section>
      <div className="Allcategorycard">
        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Heart} alt="heart" />
            <span>Heart</span>
          </Link>
        </div>

        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Brain} alt="heart" />
            <span>Brain</span>
          </Link>
        </div>

        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Estomac} alt="heart" />
            <span>Estomac</span>
          </Link>
        </div>

        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Hair} alt="heart" />
            <span>Hair</span>
          </Link>
        </div>

        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Musle} alt="heart" />
            <span>Musle</span>
          </Link>
        </div>

        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Blood} alt="heart" />
            <span>Blood</span>
          </Link>
        </div>

        <div className="category-container">
          <Link to="" className="category-box">
            <img src={Nervese} alt="heart" />
            <span>Nerves</span>
          </Link>
        </div>
      </div>

      <section id="popular-medicine">
        <div className="medicine-heading">
          <h3>latest medicines</h3>
          <Link to="/medicine">
            <span>All</span>
          </Link>
        </div>

        <div className="medicine-container">
          {medicine
            .filter((val) => {
              if (searchValue === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchValue.toLowerCase())
              )
                return val;
            })
            .map((item, index) => {
              return (
                <>
                  <div className="medicine-box" key={index}>
                    <img src={item.image[0]} alt="Medicine" />
                    <strong>{item.name}</strong>

                    {/* <span className="description">
                      <b>Description: </b>
                      {item.description}
                    </span> */}
                    <span className="expiredDate">
                      <b>ExpirationDate: </b>
                      {item.expiredDate}
                    </span>
                    <span className="address">
                      <b>Location: </b>

                      {/* {item.user_id.address} */}
                      {item && item.user_id ? item.user_id.address : "Address"}
                    </span>
                    <span className="phone">
                      <b>Phone: </b>
                      {/* {item.user_id.phone} */}
                      {item && item.user_id ? item.user_id.phone : "Phone"}
                    </span>
                    <span className="quantity">
                      <b>Quantity: </b>
                      {item.quantity}
                    </span>
                    <span className="price">
                      <b>Price: </b>
                      {item.price}$
                    </span>
                  </div>
                </>
              );
            })}
        </div>
      </section>

      <section id="popular-user">
        <div className="medicine-heading">
          <h1> What our User's say </h1>
        </div>
        <div className="medicine-container">
          <div className="medicine-box">
            <img src={UserImage} alt="Medicine" className="userImage" />
            <strong>Mark Jhon</strong>
            <p>
              <span className="address">
                This an amazing website! Actually thanks to it I was able to
                find my parents’ medications. No need to spend money calling pharmacies!
              </span>
            </p>
          </div>
          <div className="medicine-box">
            <img src={UserImage3} alt="Medicine" className="userImage" />
            <strong>Petra Joe</strong>
            <p>
              <span className="address">
                A user friendly website, easy to navigate and find my need of
                drugs.I can find what I want with a click.
              </span>
            </p>
          </div>
          <div className="medicine-box">
            <img src={UserImage2} alt="Medicine" className="userImage" />
            <strong>Jad Mesry</strong>
            <p>
              <span className="address">
                I have some medications that are about to expire soon. Thanks to
                this website I was able to sell them and make some extra money.
              </span>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;

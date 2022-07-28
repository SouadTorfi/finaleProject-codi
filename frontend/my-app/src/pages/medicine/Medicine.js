import React from "react";
import "./Medicine.css";
import Medicine1 from "../../images/Medicine1.png";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Link } from "react-router-dom";

function Medicine() {
  const [category, setCategory] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [data, setData] = useState(medicine);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getCategories();
    getMedicines();
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
  const getMedicines = async () => {
    await axios
      .get(`http://localhost:3000/api/medicine`)

      .then((res) => {
        console.log(res.data);
        setMedicine(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterResult = (catItem) => {
    const result = medicine.filter((curDate) => {
      return curDate.category_id.name === catItem;
    });
    setData(result);
  };
  return (
    <div>
      <Header />
      <div className="wrapper-medicine">
        <div id="search-container">
          <input
            type="search"
            id="search-input"
            placeholder="search madecine name  here..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* <button id="search">Search</button> */}
        </div>

        <div id="buttons-medicine">
          <button className="button-value" onClick={() => setData(medicine)}>
            All
          </button>
          {category &&
            category.map((item, index) => {
              return (
                <div key={index}>
                  <button
                    className="button-value"
                    onClick={() => filterResult(item.name)}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
        </div>

        <div className="card-container">
          {data
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
                <div className="card-medicine" key={index}>
                  <div className="img-medicine">
                    <img src={item.image[0]} />
                  </div>
                  <div className="top-text-medicine">
                    <div className="name-medicine">{item.name}</div>
                    <p>{item.price}$</p>
                  </div>
                  <div className="bottom-text-medicine">
                    <div className="text-medicine">
                      <p>{item.description}</p>
                      {/* <br></br>
                      <h4>
                        ExpiredDate: <span>{item.expiredDate}</span>{" "}
                      </h4>
                      <h4>
                        Address: <span>{item.user_id.address}</span>
                      </h4>
                      <h4>
                        Phone: <span>{item.user_id.phone}</span>
                      </h4>
                      <h4>
                        Quantity: <span>{item.quantity}</span>
                      </h4> */}
                    </div>
                    <div className="btn-readmore">
                      <Link to={`/medicinedetails/${item._id}`}>Read more</Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Medicine;

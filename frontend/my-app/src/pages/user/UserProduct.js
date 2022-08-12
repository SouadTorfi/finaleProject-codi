import React from "react";
import "./UserProduct.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/loader/Loader";

function Medicine() {
  toast.configure();
  const [category, setCategory] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const [data, setData] = useState(medicine);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("id");

  useEffect(() => {
    getCategories();
    getMedicines();
  }, []);

  const getCategories = async () => {
    await axios
      .get(`http://localhost:3000/api/category`)
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMedicines = async () => {
    await axios
      .get(`http://localhost:3000/api/medicine?user_id=${id}`)

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

  async function deleteMedicine(m_id) {
    if (window.confirm("Are you sure you want to delete Medicine?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/medicine/${m_id}`)
        .then((res) => {
          toast.success("Medicine Deleted Successfully");
          getMedicines();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div>
      <Header />
      <div className="wrapper-medicine-user">
        <div id="search-container">
          <input
            type="search"
            id="search-input"
            placeholder="search medecine name  here..."
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="UserProductLoader">
        {loading ? (
          <Loading />
        ) : (
          <>
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

        <div className="add-product-btn-div">
          <Link to="/addmedicine">
            <button className="add-product-dash-btn">Add Medicine</button>
          </Link>
        </div>
   
        <div className="card-container-user">
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
                    <div className="updateproduct">
                     
                        <Link to={"/editmedicine/"+ item._id}>
                          <button>
                          Update</button>
                        </Link>
                     
                    </div>
                    <div className="deleteproduct">
                      
                        <button onClick={() => deleteMedicine(item._id)}>
                          Delete
                        </button>
                   
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        </>
           )}
           </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Medicine;

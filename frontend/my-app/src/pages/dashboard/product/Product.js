import React from "react";
import { useState, useEffect } from "react";
import "./Product.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../components/pagination/Pagination";
import { FaAlignJustify } from "react-icons/fa";
import Loading from "../../../components/loader/Loader";

function Product() {
  const [product, serProduct] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    await axios
      .get(`http://localhost:3000/api/medicine`)
      .then((res) => {
        serProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function deleteProduct(t_id) {
    if (window.confirm("Are you sure you want to delete Medicine?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/medicine/${t_id}`)
        .then((res) => {
          toast.success("Medicine Deleted Successfully");
          getAllProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="product-table">
      <div className="main-content">
        <header>
          <label for="nav-toggle">
            <span className="fas fa-bars">
              <FaAlignJustify />
            </span>
          </label>

          <div className="search-wrapper">
            <input
              type="search"
              placeholder="Search...."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </header>
      </div>
      {loading ? (
        <div className="loaderDashboard">
          {" "}
          <Loading />
        </div>
      ) : (
        <>
          <div className="medicineDashboard-container">
            <>
              <ul className="medicineDashboard-responsive-table">
                <li className="table-content">
                  <div className="col col-1">Name</div>
                  <div className="col col-2">Description</div>
                  <div className="col col-1">Image</div>
                  {/* <div className="col col-1">Quantity</div> */}
                  <div className="col col-1">Price</div>
                  <div className="col col-1">expiredDate</div>
                  <div className="col col-1">Action</div>
                </li>
                {product &&
                  currentPosts
                    .filter((val) => {
                      if (searchValue === "") {
                        return val;
                      } else if (
                        val.name
                          .toLowerCase()
                          .includes(searchValue.toLowerCase())
                      )
                        return val;
                    })
                    .map((item, index) => {
                      return (
                        <li className="medicineDashboard-table-row" key={index}>
                          <div className="col col-1" data-label="Name">
                            {item.name}
                          </div>
                          <div className="col col-2" data-label="Description">
                            {item.description}
                          </div>

                          <div className="col col-1" data-label="Image">
                            <img src={item.image[0]} alt="Medicine" />
                          </div>
                          {/* <div className="col col-1" data-label="Quantity">
                      {item.quantity}
                    </div> */}
                          <div className="col col-1" data-label="Price">
                            {item.price}
                          </div>
                          <div className="col col-1" data-label="ExpiredDate">
                            {item.expiredDate}
                          </div>
                          <div className="col col-1">
                            <div className="delete">
                              <div className="opacity">
                                <button onClick={() => deleteProduct(item._id)}>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </>
            <div className="user-paginate">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={product.length}
                paginate={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;

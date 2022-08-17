import React from "react";
import { useState, useEffect } from "react";
import "./Category.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { FaAlignJustify } from "react-icons/fa";
import Loading from "../../../components/loader/Loader";

function Category() {
  const [category, setCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = category.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllCategory = async () => {
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

  async function deleteCategory(t_id) {
    if (window.confirm("Are you sure you want to delete category?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/category/${t_id}`)
        .then((res) => {
          toast.success("Category Deleted Successfully");
          getAllCategory();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="category-table">
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
          <div className="admin-container">
            <Link to="/dashboard/addcategory">
              <button className="add-admin-btn">Add Category</button>
            </Link>
            <ul className="admin-responsive-table">
              <li className="table-content">
                <div className="col col-1">Name</div>
                <div className="col col-2">Action</div>
              </li>
              {category &&
                currentPosts
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
                      <li className="admin-table-row" key={index}>
                        <div className="col col-1" data-label="Name">
                          {item.name}
                        </div>

                        <div
                          className="col col-2 buttons-admin"
                          data-label="Action"
                        >
                          <div className="delete update_button">
                            <Link to={"/dashboard/editcategory/" + item._id}>
                              <button>Update</button>
                            </Link>
                          </div>
                          <div className="delete">
                            {localStorage.getItem("id") === item._id ? (
                              <button disabled>Delete</button>
                            ) : (
                              <button onClick={() => deleteCategory(item._id)}>
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
            </ul>
            <div className="user-paginate">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={category.length}
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
export default Category;

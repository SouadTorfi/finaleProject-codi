import React from "react";
import { useState, useEffect } from "react";
import "./User.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../../components/pagination/Pagination";
import { FaAlignJustify } from "react-icons/fa";
import Loading from "../../../components/loader/Loader";

function User() {
  const [user, setUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    getAllusers();
  }, []);
  const getAllusers = async () => {
    await axios
      .get(`http://localhost:3000/api/user`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function deleteUser(t_id) {
    if (window.confirm("Are you sure you want to delete user?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/user/${t_id}`)
        .then((res) => {
          toast.success("User Deleted Successfully");
          getAllusers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="user-table">
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
          <div className="user-container">
            <ul className="user-responsive-table">
              <li className="table-content">
                <div className="col col-1">Name</div>
                <div className="col col-2">Email</div>
                <div className="col col-1">Phone</div>
                <div className="col col-1">Address</div>
                {/* <div className="col col-1">Action</div> */}
              </li>
              {user &&
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
                      <li className="user-table-row" key={index}>
                        <div className="col col-1" data-label="Name">
                          {item.name}
                        </div>
                        <div className="col col-2" data-label="Email">
                          {item.email}
                        </div>

                        <div className="col col-1" data-label="Phone">
                          {item.phone}
                        </div>
                        <div className="col col-1" data-label="Address">
                          {item.address}
                        </div>

                        {/* <div className="col col-1" data-label="Action">
                      <div className="delete">
                        {localStorage.getItem("id") === item._id ? (
                          <button disabled>Delete</button>
                        ) : (
                          <button onClick={() => deleteUser(item._id)}>
                            Delete
                          </button>
                        )}
                      </div>
                    </div> */}
                      </li>
                    );
                  })}
            </ul>
            <div className="user-paginate">
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={user.length}
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
export default User;

import React from "react";
import { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Pagination from "../../../components/pagination/Pagination";
import { FaAlignJustify } from "react-icons/fa";
import Loading from "../../../components/loader/Loader";

function Admin() {
  const [admin, setAdmin] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = admin.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    getAllAdmins();
  }, []);
  const getAllAdmins = async () => {
    await axios
      .get(`http://localhost:3000/api/admin`)
      .then((res) => {
        setAdmin(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function deleteAdmin(t_id) {
    if (window.confirm("Are you sure you want to delete admin?")) {
      const response = await axios
        .delete(`http://localhost:3000/api/admin/${t_id}`)
        .then((res) => {
          toast.success("Admin Deleted Successfully");
          getAllAdmins();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="admin-table">
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
            <Link to="/dashboard/addadmin">
              <button className="add-admin-btn">Add Admin</button>
            </Link>
            <ul className="admin-responsive-table">
              <li className="table-content">
                <div className="col col-1">Name</div>
                <div className="col col-2">Email</div>
                <div className="col col-1">Phone</div>
                <div className="col col-1">Address</div>
                <div className="col col-2">Action</div>
              </li>
              {admin &&
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
                        <div className="col col-2" data-label="Email">
                          {item.email}
                        </div>

                        <div className="col col-1" data-label="Phone">
                          {item.phone}
                        </div>
                        <div className="col col-1" data-label="Address">
                          {item.address}
                        </div>

                        <div
                          className="col col-2 buttons-admin"
                          data-label="Action"
                        >
                          <div className="delete update_button">
                            <Link to={"/dashboard/editadmin/" + item._id}>
                              <button>Update</button>
                            </Link>
                          </div>
                          <div className="delete">
                            {localStorage.getItem("id") === item._id ? (
                              <button disabled>Delete</button>
                            ) : (
                              <button onClick={() => deleteAdmin(item._id)}>
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
                totalPosts={admin.length}
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
export default Admin;

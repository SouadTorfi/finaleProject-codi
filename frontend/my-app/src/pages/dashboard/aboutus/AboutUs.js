import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../../components/loader/Loader";

function AboutUs() {
  const [aboutus, setAboutUs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getaboutUs();
  }, []);
  const getaboutUs = async () => {
    await axios
      .get(`http://localhost:3000/api/aboutus`)
      .then((res) => {
        setAboutUs(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="aboutUs-dashboard">
      {loading ? (
        <div className="loaderDashboard">
          {" "}
          <Loading />
        </div>
      ) : (
        <>
          {aboutus &&
            aboutus.map((item, index) => {
              return (
                <div className="aboutus-dashboard-page" key={index}>
                  <div className="part1">
                    <div className="aboutus-dashboard-image">
                      <img src={item?.image ? item.image[0] : undefined} />
                    </div>

                    <div className="aboutus-dashboard-text">
                      <div className="aboutus-dashboard-underline">
                        {" "}
                        <span>About us</span>
                      </div>
                      <h2>
                        About <span>Our Website</span>
                      </h2>
                      <p>{item.paragraphe1}</p>
                    </div>
                  </div>
                  <div className="part2">
                    <div className="sec-title">
                      <span className="title">Our Future Goal</span>
                      <h2>{item.title1}</h2>
                    </div>
                    <div className="aboutus-dashboard-part2-text">
                      {item.paragraphe2}
                    </div>
                    <div className="aboutus-dashboard-part2-text">
                      {item.paragraphe3}
                    </div>
                    <div className="aboutus-dashboard-part2-text">
                      {item.paragraphe4}
                    </div>
                    <div className="update-aboutus update_button-aboutus-dashboard">
                      <Link to={"/dashboard/editaboutus/" + item._id}>
                        <button>Update</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}

export default AboutUs;

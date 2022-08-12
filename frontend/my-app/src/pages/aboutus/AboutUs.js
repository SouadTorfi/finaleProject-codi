import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import Medicine1 from "../../images/userImage2.jpg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Loading from "../../components/loader/Loader";

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
    <div>
      <Header />
    <div className="AboutUs-Us">
      {loading ? (
          <Loading />
        ) : (
          <>
        {aboutus &&
          aboutus.map((item, index) => {
            return (
              <div className="aboutus-page" key={index}>
                <div className="part1">
                  <div className="aboutus-image">
                    <img src={item?.image ? item.image[0] : undefined} />
                  </div>

                  <div className="aboutus-text">
                    <div className="aboutus-underline">
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
                  <div className="aboutus-part2-text">{item.paragraphe2}</div>
                  <div className="aboutus-part2-text">{item.paragraphe3}</div>
                  <div className="aboutus-part2-text">{item.paragraphe4}</div>
                </div>
              </div>
            );
          })}
          
          </>



        )}
    
    </div>
      <Footer />
    </div>
  );
}

export default AboutUs;

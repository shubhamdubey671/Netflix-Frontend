import React, { useEffect, useState } from "react";
// import home from "../assets/home.jpg";

import axios from "./Axios.jsx";
import requests from "./Requests.jsx";
import "../style/banner.scss";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchDate() {
      const request = await axios.get(requests.fetchNetflixOriginals);

      // console.log(request);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchDate();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "...." : string;
  }
  return (
    <>
      <header
        className="bannner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundPosition: "centre centre ",
        }}
      >
     

        <div className="banner_content">
          <h1 className="banner_tittle">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>

        <div className="banner-fade" />
      </header>
    </>
  );
};

export default Banner;

import React from "react";
import Nav from "./Nav.jsx";
import Banner from "./Banner.jsx";
import requests from "./Requests.jsx";
import Row from "./Row.jsx";
import "../style/homeScreen.scss";


const HomeScreen = () => {
  return (
    <>
      <div className="HomeScreen">
        <Nav />
        <Banner />
        <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow= {true}/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated"    fetchUrl={requests.fetchTopRated} />
        <Row title="Tv Shows"    fetchUrl={requests.fetchTvShows} />
        {/* <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}   /> */}

      </div>
    </>
  );
};

export default HomeScreen;

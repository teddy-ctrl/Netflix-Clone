import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

const Banner = () => {
  const [movie, setMovie] = useState({});


  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log("Error fetching data:", error);
      }

    })();

  }, []);

  // Truncate helper function for description
  const truncate = (str, maxLength) => {
    if (!str) return "";
    return str?.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
  };

  return (
    <>
      <div
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: movie?.backdrop_path
            ? `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
            : "url(https://via.placeholder.com/1200x600)", // Fallback image
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title ||
              movie?.name ||
              movie?.original_name ||
              "Movie Title"}
          </h1>
          <div className="banner_buttons">
            <button className="banner_button play" aria-label="Play movie">
              Play
            </button>
            <button className="banner_button" aria-label="Add to My List">
              My List
            </button>
          </div>
          {movie?.overview && (
            <h1 className="banner_description">
              {truncate(movie.overview, 150)}
            </h1>
          )}
        </div>
        <div className="banner_fadeBottom"></div>
      </div>
    </>
  );
};

export default Banner;

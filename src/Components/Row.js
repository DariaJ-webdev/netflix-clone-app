import React, { useState, useEffect } from 'react';
import requests from '../requests';
import axios from '../axios';
import '../cstyles/Row.css';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); 

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); 
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          } else {
            alert("Sorry, a trailer for this movie isn't available.");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Sorry, a trailer for this movie isn't available.");
        });
    }
  };

  return (
    <div className="row">
      <h2 className="Categ">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>

      {/* Trailer overlay */}
      {trailerUrl && (
        <div 
          className="overlay" 
          onClick={() => setTrailerUrl("")}
        >
          <div 
            className="overlay-content" 
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <LiteYouTubeEmbed
              id={trailerUrl}
              title={title}
              adNetwork={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Row;

import React from 'react';
import { useState, useEffect } from 'react';
import requests from '../requests';
import axios from '../axios';
import '../cstyles/Row.css';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMoviews] =useState([]);
    const [trailerUrl, setTrailerUrl] = useState(""); //whenever user clicks a movie, this will store the trailer URL...
// useEffect is a snippet of code that runs on this condition 
    useEffect(() => { 
        // if [], run once when the row loads, and don't run again
        //if [movies], run every time movies changes
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            //console.log(request); to see data structure in the console
            setMoviews(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]); 
    
    const opts = {
        height: "390",
        width: "100%",
        playerVars:{ 
            autoplay:1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl(""); //if trailer is already open, close it
        } else {
            movieTrailer(movie?.name || "" )
                .then(url => {
                    const urlParams = new URLSearchParams (new URL(url).search);
                    setTrailerUrl(urlParams.get("v"))
                })
                .catch((error) => console.log(error));
                }
    };
    

  return (
    <div className="row">
        <h2 className="Categ">{title}</h2>
        <div className="row__posters">
            {movies.map(movie => (
                <img 
                key={movie.id} //important for optimization--saves on loading time for big lists
                onClick ={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`} //everything gets a row__poster class
                src={`${base_url}${
                    isLargeRow ? movie.poster_path:movie.backdrop_path
                }`} 
                alt={movie.name} />
            ))}
        </div>
       {trailerUrl && (<LiteYouTubeEmbed
                id={trailerUrl} 
                title={title}
                adNetwork={false} 
            />
        )}
    </div>
);
}

export default Row

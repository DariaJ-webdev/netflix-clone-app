import './App.css';
import React from 'react';
import requests from './requests';
import Row from './Components/Row';
import Banner from './Components/Banner';
import Nav from './Components/Nav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


//https://www.youtube.com/live/XtMThy8QKqU?feature=shared

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Banner />
        <Routes>
          
          <Route path="/" element={
            <>
              <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
              <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
              <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
              <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
              <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
              <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
              <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
              <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
            </>
          } />
          {/* Add more routes for different pages, e.g., a 'My List' page */}
          <Route path="/" element={<div>Home</div>} />
          <Route path="/TvShows" element={<div>TV Shows</div>} />
          <Route path="/Movies" element={<div>Movies</div>} />
          <Route path="/Games" element={<div>Games</div>} />
          <Route path="/New&Popular" element={<div>New & Popular</div>} />
          <Route path="/My List" element={<div>My List</div>} />
          <Route path="/Browse by Languages" element={<div>Browse by Languages</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




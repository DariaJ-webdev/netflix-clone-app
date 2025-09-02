import React, { useState, useEffect } from 'react'
import '../cstyles/Nav.css';
import logo from "../assets/netflix_full_logo.png";
import avatar from "../assets/Netflix_avatar.png";
import { Link } from 'react-router-dom'

function Nav() {
  const [show, handleShow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100) {
        handleShow(true);
      } 
      else handleShow(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

   const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__container">
        <div className="nav__logo-and-links">
             <img
      className="nav__logo"
      src={logo}
      alt="Netflix Logo"/>

       <div className="nav__links-container">
              <div 
                className="nav__links-dropdown" 
                onClick={handleDropdownToggle}
              >
                <span>Browser</span>
                <span className="dropdown-arrow">{isDropdownOpen ? '▲' : '▼'}</span> 
              </div>
      
      <div className={`nav__links ${isDropdownOpen ? 'nav__links--open' : ''}`}>
      <Link to="/">Home</Link>
      <Link to="/TvShows">TV Shows</Link>
      <Link to="/Movies"> Movies</Link>
      <Link to="/Games">Games</Link>
      <Link to="/New & Popular">New & Popular</Link>
      <Link to="/My List">My List</Link>
      <Link to="/Browse by Languages">Browse by Languages</Link>
      </div>   
      </div>
      </div>

      <img className="nav__avatar"
      src={avatar}
      alt="Netflix Avatar"/>
      </div>
    </div>
  )
}

export default Nav

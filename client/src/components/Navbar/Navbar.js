import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import decode from 'jwt-decode';

import logo from '../../assets/images/checkLogo.svg';
import './Navbar.css';

import NavMenuButton from './NavMenuButton';

export default () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    validateToken();
  });

  const validateToken = () => {
    if (localStorage.getItem('token')) {
      const decodedToken = decode(localStorage.getItem('token'));
      const currentTime = Math.floor(new Date().getTime() / 1000);

      if (currentTime > decodedToken.exp) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }

  const handleMenuClick = () => {
    setMenuIsVisible(!menuIsVisible);
  }

  function handleSignOut() {
    localStorage.removeItem('token');
  }

  return (
    <nav className="Navbar">
      <div className="logo-container">
        <img className="logo-img" src={logo} alt="logo" />
        <h1 className="logo-text">List It!</h1>
      </div>
      <NavMenuButton handleMenuClick={handleMenuClick} />
      <ul className={menuIsVisible ? "dropdown visible" : "dropdown"}>
        {
          isLoggedIn
          ? <><li><Link to="/users/345345/lists">My Lists</Link></li>
            <li onClick={handleSignOut}><Link to="/">Sign Out</Link></li></>
          : <li><Link to="/login">Log In</Link></li>
        }
      </ul>
    </nav>
  );
};

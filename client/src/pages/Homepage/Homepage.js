import React from "react";
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import './Homepage.css';

export default () => {
  return (
    <div className="Homepage">
      <Navbar />
      <div className="hero-container">
        <h1 className="hero-header">Real time lists for everyone.</h1>
        <button className="hero-button"><Link to="/login">SIGN UP TODAY</Link></button>
      </div>
    </div>
  );
};

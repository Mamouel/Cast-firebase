import React from 'react';

import { NavLink } from "react-router-dom";


const HomeFooter = () => {
  return (
    <div className="home-footer-buttons">
      <NavLink to="/stories" className="home-btn-links home-btn-ctn1">
        <div
          className="home-btn-ctn"
        >
          <div className="buttons-label">Stories</div>
        </div>
      </NavLink>
      <NavLink to="/create" className="home-btn-links home-btn-ctn2">
        <div
          className="home-btn-ctn"
        >
          <div className="buttons-label">Create your own</div>
        </div>
      </NavLink>
      <NavLink to="/" className="home-btn-links home-btn-ctn1">
        <div
          className="home-btn-ctn"
        >
          <div className="buttons-label">About</div>
        </div>
      </NavLink>
    </div>
  )
}

export default HomeFooter;

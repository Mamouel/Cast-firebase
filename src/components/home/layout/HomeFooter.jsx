import React from 'react';

import { NavLink } from "react-router-dom";
import createLogo from "../../../style/images/logoCreate.PNG";
import aboutLogo from "../../../style/images/logoAbout.PNG";
import storiesLogo from "../../../style/images/logoStories.PNG";



const HomeFooter = () => {
  return (
    <div className="home-footer-buttons">
      <NavLink to="/stories" className="home-btn-links home-btn-ctn1">
        <div className="home-btn-ctn">
          <img className="logo-ctn" src={storiesLogo} alt="storiesLogo" />
          <div className="buttons-label">Stories</div>
        </div>
      </NavLink>
      <div className="home-footer-sepdiv" />
      <NavLink to="/create" className="home-btn-links home-btn-ctn2">
        <div className="home-btn-ctn">
          <img className="logo-ctn" src={createLogo} alt="createLogo" />
          <div className="buttons-label">Create your own</div>
        </div>
      </NavLink>
      <div className="home-footer-sepdiv" />
      <NavLink to="/" className="home-btn-links home-btn-ctn1">
        <div className="home-btn-ctn">
          <img className="logo-ctn" src={aboutLogo} alt="aboutLogo" />
          <div className="buttons-label">About</div>
        </div>
      </NavLink>
    </div>
  )
}

export default HomeFooter;

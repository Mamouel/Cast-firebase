import React from 'react';

import logo from "../../../style/images/logoCastWhite.png";


const SubBanner = () => {
  return (
    <div className="second-home-section">
      <div className="subtitle-ctn">
        <h2 className="subtitle">
          The new way to <span className="bold-italic">share your stories</span> with your friends !
        </h2>
      </div>
      <div className="second-logo-ctn">
        <img className="second-logo" src={logo} alt="second-logo" />
      </div>
    </div>
  )
};

export default SubBanner;

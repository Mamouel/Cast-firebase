import React from "react";

import { FaAngleLeft } from 'react-icons/fa';

const LeftArrow = (props) => {
  return (
    <div 
      className="back-arrow" 
      style={{ margin: "auto 30px", flexGrow: 1, fontSize: 60, color: "#FF4F4F", cursor: "pointer" }}
      onClick={props.handleScrollLeft}
    >
      <FaAngleLeft />
    </div>
  )
}

export default LeftArrow;
import React from "react";

import { FaAngleRight } from 'react-icons/fa';

const RightArrow = (props) => {
  return (
    <div 
      className="next-arrow" 
      style={{ margin: "auto 30px", flexGrow: 1, fontSize: 60, color: "#FF4F4F", cursor: "pointer" }} 
      onClick={props.handleScrollRight}
    >
      <FaAngleRight />
    </div>
  )
}

export default RightArrow;
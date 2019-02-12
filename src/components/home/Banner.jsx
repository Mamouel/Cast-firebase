// @flow
import React from "react";
import PropTypes from "prop-types";

import bannerImg from "../../style/images/banner.jpg";

type Props = {
  labels: array
};

const Banner = (props: Props) => {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}>
        <img
          src={bannerImg}
          style={{ width: "100%", height: 700, opacity: 0.7 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 20,
          fontSize: 120,
          fontWeight: "bold",
          marginLeft: 80,
          color: "#f48000"
        }}
      >
        {props.labels.map((l, idx) => (
          <div
            style={{
              marginLeft: idx * 80,
              marginTop: 40,
              textShadow: "2px 2px rgba(0,0,0,0.3)"
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

Banner.propTypes = {
  labels: PropTypes.array
};

export default Banner;

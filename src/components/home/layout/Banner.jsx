// @flow
import React from "react";
import PropTypes from "prop-types";

import "../../../style/components/home/banner.scss"

type Props = {
  labels: Array<string>
};

const Banner = (props: Props) => {
  return (
    <div className="banner-wrapper">
      <div className="banner-img-ctn animated fadeIn">
      </div>
      <div className="labels animated fadeInLeft delay-1s">
        {props.labels.map((l, idx) => (
          <div
            style={{
              marginLeft: 80,
              textShadow: "2px 2px rgba(0,0,0,0.3)"
            }}
            key={idx}
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

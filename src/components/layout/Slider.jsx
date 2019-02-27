import React from 'react';
import { Link } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';

import StorySummary from "../stories/StorySummary";

import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";
import LoadingAnimation from "./LoadingAnimation";

import "../../style/components/layout/slider.scss"

const Slider = (props) => {

  const { stories } = props;


  const handleScrollRight = (e) => {
    e.preventDefault();
    const slider = document.getElementById("slider");
    slider.scrollLeft += 600;
  }

  const handleScrollLeft = (e) => {
    e.preventDefault();
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 600;
  }


  return (
    <div>
      {stories !== undefined ?
            <div className="first-home-section">
              <LeftArrow handleScrollLeft={handleScrollLeft}/>
              <div id="slider" className="first-home-section-slider" >
                {stories &&
                  stories.map(story => {
                    return (
                      <Link
                        className="story-link"
                        to={"/story/" + story.id}
                        key={story.id}
                      >
                        <ScrollAnimation animateIn="fadeIn">
                          <StorySummary story={story} />
                        </ScrollAnimation>
                      </Link>
                    );
                  })}
              </div>
              <RightArrow handleScrollRight={handleScrollRight} />
            </div> : <LoadingAnimation />
          }
    </div>
  )
}


export default Slider;
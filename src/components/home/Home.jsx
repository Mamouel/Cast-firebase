// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, NavLink, Link } from "react-router-dom";
import ScrollAnimation from 'react-animate-on-scroll';

import StorySummary from "../stories/StorySummary";
import Banner from "./layout/Banner";
import LeftArrow from "./layout/LeftArrow";
import RightArrow from "./layout/RightArrow";
import LoadingAnimation from "../layout/LoadingAnimation";
import logo from "../../style/images/logoCastWhite.png";


import "../../style/components/home/home.scss";

type Props = {
  stories: Array<Object>,
  auth: Object,
  notifications: Array<Object>
};

class Home extends Component<Props> {
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleScrollRight = (e) => {
    e.preventDefault();
    const slider = document.getElementById("slider");
    slider.scrollLeft += 600;
  }

  handleScrollLeft = (e) => {
    e.preventDefault();
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 600;
  }

  render() {
    const { auth, stories } = this.props;
    const slider = document.getElementById("slider");
    console.log(stories)
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="home-container">
        <Banner labels={["Stories", "Goodies", "Memories"]} />

        <div className="home-section-ctn">
          {stories !== undefined ?
            <div className="first-home-section">
              <LeftArrow handleScrollLeft={this.handleScrollLeft}/>
              <div id="slider" className="first-home-section-slider" >
                {stories &&
                  stories.slice(0, 15).map(story => {
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
              <RightArrow handleScrollRight={this.handleScrollRight} />
            </div> : <LoadingAnimation />
          }

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
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  stories: PropTypes.array,
  auth: PropTypes.object.isRequired,
  notifications: PropTypes.array
};

const mapStateToProps = state => ({
  stories: state.firestore.ordered.stories,
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "stories", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 5, orderBy: ["time", "desc"] }
  ])
)(Home);

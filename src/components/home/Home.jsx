import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, NavLink, Link } from "react-router-dom";

import StorySummary from "../stories/StorySummary";
import Notifications from "../layout/Notifications";
import Banner from "./Banner";

import bannerImg from "../../style/images/banner.jpg";
import dikkenek from "../../style/images/dikkenek.jpg";
import oss from "../../style/images/oss.jpg";
import workaholic from "../../style/images/workaholic.jpg";

import "../../style/components/home/home.css";

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { auth, stories, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="home-container">
        <Banner labels={["Stories", "Goodies", "Slibardages"]} />
        <div className="home-section-ctn" style={{ paddingTop: 700 }}>
          <div className="first-home-section">
            <div className="first-home-section-img">
              <Notifications notifications={notifications} />

            </div>
            <div className="first-home-section-infos" />
          </div>
        </div>
        <div className="home-section-ctn">
          <div className="second-home-section">
            <div className="second-home-section-title">10 latest</div>
            <div className="second-home-section-slider">
              {stories &&
                stories.slice(0, 10).map(story => {
                  return (
                    <Link
                      className="story-link"
                      to={"/story/" + story.id}
                      key={story.id}
                    >
                      <StorySummary story={story} />
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="second-home-section-buttons">
            <NavLink to="/stories" className="home-btn-links home-btn-ctn1">
              <div
                className="home-btn-ctn "
                style={{ backgroundImage: `url(${dikkenek})` }}
              >
                <div className="buttons-label">Stories</div>
              </div>
            </NavLink>
            <NavLink to="/create" className="home-btn-links home-btn-ctn2">
              <div
                className="home-btn-ctn"
                style={{ backgroundImage: `url(${oss})` }}
              >
                <div className="buttons-label">Create your own</div>
              </div>
            </NavLink>
            <NavLink to="/" className="home-btn-links home-btn-ctn1">
              <div
                className="home-btn-ctn"
                style={{ backgroundImage: `url(${workaholic})` }}
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

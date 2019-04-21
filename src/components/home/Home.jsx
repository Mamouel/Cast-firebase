// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import Banner from "./layout/Banner";
import Slider from "../layout/Slider";
import SubBanner from "./layout/SubBanner";
import Footer from "./layout/HomeFooter";

import Notifications from "../layout/Notifications";


import "../../style/components/home/home.scss";

type Props = {
  stories: Array<Object>,
  auth: Object,
  notifications: Array<Object>
};

class Home extends Component<Props> {
  
  render() {
    const { auth, stories, notifications } = this.props;

    let latestStories;

    stories ? latestStories = stories.slice(0, 15) : latestStories = []; 

    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="home-container">
        <Banner labels={["Stories", "Goodies", "Memories"]} />

        <div className="home-section-ctn">
          
          <Slider stories={latestStories} />

          <SubBanner />

          <Notifications notifications={notifications}/>

          <Footer />

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

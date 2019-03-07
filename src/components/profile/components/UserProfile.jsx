import React from "react";
import { Link } from "react-router-dom";

import Slider from "../../layout/Slider";



const UserProfile = (props) => {
  const { stories, profile, bannerImg, userStories } = props
  return (
    <div className="profile-container">
          <div className="profile-banner" style={{backgroundImage: `url(${bannerImg})`}}>
            <div className="profile-infos">
              <div>Hi {profile.firstName}!</div>
            </div>
          </div>
          <div className="profile-stories-title">
            <p>Your stories</p>
          </div>
          {
            userStories.length === 0 ? 
            <div>
              <div className="profile-stories-emptylist">
                No story to show
              </div>
              <Link to="/create">
                <button className="primary-btn create-btn create-btn-profile">Let"s create one!</button>
              </Link>
            </div> :
            <div>
            <Slider stories={userStories} />
            </div>
          }
        </div>
  )
}

export default UserProfile;
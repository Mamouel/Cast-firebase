import React from "react";
import Slider from "../../layout/Slider";



const otherUserProfile = (props) => {
  const { targetedUserInfos, userTargetedStories, bannerImg} = props
  return (
    <div className="profile-container">
      <div className="profile-banner" style={{backgroundImage: `url(${bannerImg})`}}>
        <div className="profile-infos">
          <div>{ targetedUserInfos.firstName } { targetedUserInfos.lastName }</div>
        </div>
      </div>
      {
        userTargetedStories.length !== 0 &&
        <div>
          <Slider stories={userTargetedStories} /> 
        </div>
      }
    </div>
  )
}

export default otherUserProfile;

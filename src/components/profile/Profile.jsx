// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import Slider from "../layout/Slider";
import bannerImg from "../../style/images/oss.jpg";

import '../../style/components/profile/profile.scss';
import LoadingAnimation from '../layout/LoadingAnimation';

type Props = {
  auth: Object,
  profile: Object,
  stories: Array<Object>,
  users: Array<Object>,
  match: Object
};

class Profile extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  getUserStories = (stories: Array<Object>, id: number ) => {
    let currentList = [];
    let newList = [];
    if (stories && id) {
      currentList = stories;
      newList = currentList.filter(story => {
        if(story.authorId === id) {
          return story
        } else {
          return null
        }
      });
    } else {
      newList = stories;
    }
    return newList;
  }

  getTargetedUser = (users: Array<Object>, id: number) => { 
    let usersList = [];
    let targetedUser = [];
    let targetedUserId = id;
    if(users && targetedUserId) {
      usersList = users;
      targetedUser = usersList.filter(user => {
        if(user.id === targetedUserId) return user;
        return null;
      });
    } else {
      targetedUser = [];
    }
    return targetedUser;
  }

  render() {
    const { stories, auth, profile, users } = this.props;
    const targetedUserId = this.props.match.params.id;
    const currentUserId = auth.uid;

    if (!auth.uid) return <Redirect to='/signin'/>
    if(!stories) return <Redirect to='/'/>
    const userStories = this.getUserStories(stories, auth.uid);

    let targetedUser;
    if(targetedUserId !== currentUserId) {
      targetedUser = this.getTargetedUser(users, targetedUserId);
      const targetedUserInfos = targetedUser[0];
      
      if(targetedUserInfos) {
        const userTargetedStories = this.getUserStories(stories, targetedUserInfos.id);
        return (
          <div className='profile-container'>
            <div className='profile-banner' style={{backgroundImage: `url(${bannerImg})`}}>
              <div className='profile-infos'>
                <div>{ targetedUserInfos.firstName } { targetedUserInfos.lastName }</div>
              </div>
            </div>
            <div className='profile-stories-title'>
              <p>{ targetedUserInfos.firstName }'s Stories </p>
            </div>
            <Slider stories={userTargetedStories} />
          </div>
        )
      } else {
        return <LoadingAnimation />
      }
    }

    if(profile) { 
      return (
        <div className='profile-container'>
          <div className='profile-banner' style={{backgroundImage: `url(${bannerImg})`}}>
            <div className='profile-infos'>
              <div>Hi {profile.firstName}!</div>
            </div>
          </div>
          <div className='profile-stories-title'>
            <p>Your stories</p>
          </div>
          {
            userStories.length === 0 ? 
            <div>
              <div className='profile-stories-emptylist'>
                No story to show
              </div>
              <Link to='/create'>
                <button className='primary-btn create-btn create-btn-profile'>Let's create one!</button>
              </Link>
            </div> :
            <div>
            <Slider stories={userStories} />
            </div>
          }
        </div>
      )
    }
  }
};

Profile.propTypes = {
  auth: PropTypes.object,
  profile: PropTypes.object,
  stories: PropTypes.array,
  users: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories' },
    { collection: 'users' }
  ])
)(Profile);
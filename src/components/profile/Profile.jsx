import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import StorySummary from '../stories/StorySummary';

import '../../style/components/profile/profile.scss';
import LoadingAnimation from '../layout/LoadingAnimation';

class Profile extends Component {


  getUserStories = (stories, id) => {
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


  getTargetedUser = (users, id) => { 
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
      
      console.log(targetedUserInfos)
      if(targetedUserInfos) {
        const userTargetedStories = this.getUserStories(stories, targetedUserInfos.id);
        return (
          <div className='profile-container'>
            <div className='profile-banner'>
              <div className='profile-infos'>
                <div>{ targetedUserInfos.firstName } { targetedUserInfos.lastName }</div>
              </div>
            </div>
            <div className='profile-stories-title'>
              <p>{ targetedUserInfos.firstName }'s Stories </p>
            </div>
            <div className='profile-stories-list'>
              {userTargetedStories && userTargetedStories.map(story => {
                return (
                  <Link className='story-link' to={'/story/' + story.id} key={story.id}>
                    <StorySummary story={story} />
                  </Link>
                )
              })}
            </div>
          </div>
        )
      } else {
        return <LoadingAnimation />
      }
    } 


    if(userStories.length === 0 && profile) { 
      return (
        <div className='profile-container'>
          <div className='profile-banner'>
            <div className='profile-infos'>
              <div>Hi {profile.firstName}!</div>
            </div>
          </div>
          <div className='profile-stories-title'>
            <p>Your stories</p>
          </div>
          <div className='profile-stories-emptylist'>
            No story to show
          </div>
          <Link to='/create'>
            <button className='primary-btn create-btn create-btn-profile'>Let's create one!</button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className='profile-container'>
          <div className='profile-banner'>
            <div className='profile-infos'>
              <div>Hi {profile.firstName}!</div>
            </div>
          </div>
          <div className='profile-stories-title'>
            <p>Your stories</p>
          </div>
          <div className='profile-stories-list'>
            {userStories && userStories.map(story => {
              return (
                <Link className='story-link' to={'/story/' + story.id} key={story.id}>
                  <StorySummary story={story} />
                </Link>
              )
            })}
          </div>
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
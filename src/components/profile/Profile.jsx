import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import StorySummary from '../stories/StorySummary';

import LoadingAnimation from '../layout/LoadingAnimation';

import '../../style/components/profile/profile.scss';

class Profile extends Component {

  getUserStories = (stories, auth) => {
    let currentList = [];
    let newList = [];

    if (stories && auth.uid) {
      currentList = stories;
      newList = currentList.filter(story => {
        if(story.authorId === auth.uid) {
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

  render() {

    const { stories, auth, profile } = this.props
    if (!auth.uid) return <Redirect to='/signin'/>
    if(!stories) return <Redirect to='/'/>


    const userStories = this.getUserStories(stories, auth);
    console.log(userStories)
    if(userStories.length === 0) { 
      return (
        <div className='profile-container'>
          <div className='profile-banner'>
            <div className='profile-infos'>
              <div>{profile.firstName}</div>
            </div>
          </div>
          <div className='profile-stories-title'>
            <p>Your stories</p>
          </div>
          <div className='profile-stories-list'>
            No story to show
          </div>
          <Link to='/create'>
            <button className='primary-btn'>Let's create one!</button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className='profile-container'>
          <div className='profile-banner'>
            <div className='profile-infos'>
              <div>{profile.firstName}</div>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import StorySummary from '../stories/StorySummary';


import '../../style/components/profile/profile.css';

class Profile extends Component {
  render() {
    const { stories, auth, profile } = this.props
    console.log(this.props)
    if (!auth.uid) return <Redirect to='/signin'/>

    return(
      <div className='profile-container'>
        <div className='banner'>
          <div className='profile-infos'>
            <div>{profile.firstName}</div>
          </div>
        </div>
          <p>Your stories</p>
        <div className='profile-stories-list'>
          {stories && stories.map(story => {
            if(story.authorId === auth.uid) {
              return (
                <Link className='story-link' to={'/story/' + story.id} key={story.id}>
                  <StorySummary story={story} />
                </Link>
              )
            }
          })}
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories' }
  ])
)(Profile);
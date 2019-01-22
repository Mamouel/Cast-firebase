import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import firebase from '../../config/fbConfig';



const StoryDetails = (props) => {
  
  const { story, auth } = props;
  const storageRef = firebase.storage().ref();
  const storyImg = storageRef.child(story.img).getDownloadURL().then((url) => {
    var img = document.getElementById('story-img');
    img.src = url;
  });
  if (!auth.uid) return <Redirect to='/signin'/>
  if(story) {
    return(
      <div className='stories-details-container'>
        <div className='stories-details-card'>
        <img id='story-img' alt='story-img'></img>
          <div className='stories-details-card-content'>
            <span className='stories-details-card-title'>{ story.title }</span>
            <p>{ story.content }</p>
          </div>
          <div className='stories-details-card-action'>
            <div className='stories-details-author'>Posted by { story.authorFirstName } { story.authorLastName }</div>
            <div className='stories-details-date'>{moment(story.createdAt.toDate().toISOString()).calendar()}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return(
      <div><p>Loading story...</p></div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const stories = state.firestore.data.stories;
  const story = stories ? stories[id] : null;
  return {
    story: story,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories' }
  ])
)(StoryDetails);
import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import firebase from '../../config/fbConfig';

import { deleteStory } from '../../store/actions/storyActions';

import LoadingAnimation from '../layout/LoadingAnimation';


import '../../style/components/stories/story-details.css';

const StoryDetails = (props) => {
  
  const { story, auth } = props;
  const storyId = props.match.params.id;
  const storageRef = firebase.storage().ref();
  
  const storyImgRef = async () => { 
    try {
      await storageRef.child(story.img).getDownloadURL().then((url) => {
        var img = document.getElementById('story-img');
        img.src = url;
      });
    } catch(err) {
      console.log(err)
    }
  }

  const removeImage = async () => {
    try {
     await storageRef.child(story.img).delete().then(() => {
        console.log('img deleted')
      });
    } catch(err) {
      console.log(err)
    }
  }

  const alertUserBeforeDelete = (story, storyId) => {
    console.log(storyId)
    let answer = window.confirm("Do you really want to delete this story?");
    if(answer) {
      removeImage();
      props.deleteStory(story, storyId)
      props.history.push("/stories")
    } else {
      console.log("cancelled")
    }
}

  if(story) {
    window.scrollTo(0, 0);
    storyImgRef();
  } else {
    return <Redirect to='/' />
  }

  if (!auth.uid) return <Redirect to='/signin'/>
  
  if(story) {
    return(
      <div className='stories-details-container'>
        <div className='stories-details'>
          <div className='secondary-banner'>
            <div className='stories-details-title-ctn'>
              <span className='stories-details-title'>{ story.title }</span>
            </div>
            <div className='stories-details-infos'>
              <div className='stories-details-author'>Posted by { story.authorFirstName } { story.authorLastName }</div>
              <div className='stories-details-date'>{moment(story.createdAt.toDate().toISOString()).calendar()}</div>
            </div>
          </div>
          <div className='stories-details-img-ctn'>
            <img className='stories-details-img' id='story-img' alt='story-img' />
          </div>
          

          <div className='stories-details-content'>
            <p>{ story.content }</p>
          </div>
          {auth.uid === story.authorId && (
            <button className='delete-story-btn' onClick={() => alertUserBeforeDelete(story, storyId)}>Delete this story</button>
          )}
        </div>
      </div>
    )
  } else {
    return(
      <div><LoadingAnimation /></div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStory: (story, storyId) => dispatch(deleteStory(story, storyId))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'stories' }
  ])
)(StoryDetails);
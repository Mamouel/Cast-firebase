// @flow
import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import firebase from '../../config/fbConfig';

import { deleteStory } from '../../store/actions/storyActions';
import { commentStory } from '../../store/actions/commentsActions';


import LoadingAnimation from '../layout/LoadingAnimation';
import CommentsList from './CommentsList';


import '../../style/components/stories/story-details.scss';

type Props = {
  story: Object,
  auth: Object,
  history: Object,
  match: Object,
  deleteStory: (story: Object, storyId: string) => void
};



const storageRef = firebase.storage().ref();


class StoryDetails extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      commentContent: '',
      storyId: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = (e) => {
    this.setState({
      commentContent: e.target.value,
      storyId: this.props.match.params.id
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const comment = this.state;
    this.props.commentStory(comment);
    this.setState({ commentContent: '', storyId: '' })
  };


  storyImgRef = async () => { 
    try {
      await storageRef.child(this.props.story.img).getDownloadURL().then((url) => {
        var img = document.getElementById('story-img');
        img.src = url;
      });
    } catch(err) {
      console.log(err)
    }
  }

  removeImage = async () => {
    try {
     await storageRef.child(this.props.story.img).delete().then(() => {
        console.log('img deleted')
      });
    } catch(err) {
      console.log(err)
    }
  }

  alertUserBeforeDelete = (story, storyId) => {
    let answer = window.confirm("Do you really want to delete this story?");
    if(answer) {
      this.removeImage();
      this.props.deleteStory(story, storyId)
      this.props.history.push("/stories")
    } else {
      console.log("cancelled")
    }
  }

  render() {

    const { story, auth, comments } = this.props;
    const storyId = this.props.match.params.id;
  
    if(!story) return <Redirect to='/' />
    if (!auth.uid) return <Redirect to='/signin'/>
    
    if(story && comments) {
      this.storyImgRef();
      return (
        <div className='stories-details-container'>
          <div className='stories-details'>
            <div className='secondary-banner'>
              <div className='stories-details-title-ctn'>
               { story.title }
              </div>
            </div>
            <div className='stories-details-img-ctn'>
              <img className='stories-details-img' id='story-img' alt='story-img' />
            </div>
            <div className='stories-details-infos'>
                <div className='stories-details-author'>Posted by { story.authorFirstName } { story.authorLastName }</div>
                <div className='stories-details-date'>{moment(story.createdAt.toDate().toISOString()).calendar()}</div>
              </div>
  
            <div className='stories-details-content'>
              <p>{ story.content }</p>
            </div>
            <div className='delete-btn-ctn'>
              {auth.uid === story.authorId && (
                <button className='primary-btn delete-story-btn' onClick={() => this.alertUserBeforeDelete(story, storyId)}>Delete this story</button>
              )}
            </div>
          </div>
          <div className="comment-form-ctn">
            <form className="comment-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.commentContent}
                placeholder="Leave comment..."
                onChange={this.handleChange}
                style={{margin: "auto"}}
              />
              <button className="primary-btn login-btn" type="submit" value="Post">Post</button>
            </form>
          </div>
          <div><CommentsList comments={comments} storyId={storyId}/></div>
        </div>
      )
    } else {
      return (
        <div><LoadingAnimation /></div>
      )
    }
  }
}

StoryDetails.propTypes = {
  story: PropTypes.object,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  comments: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const stories = state.firestore.data.stories;
  const story = stories ? stories[id] : null;
  return {
    story: story,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    comments: state.firestore.ordered.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStory: (story, storyId) => dispatch(deleteStory(story, storyId)),
    commentStory: (state) => dispatch(commentStory(state))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'stories' },
    { collection: 'comments', orderBy: ['createdAt', 'desc'] }
  ])
)(StoryDetails);
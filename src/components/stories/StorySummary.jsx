import React, { Component } from 'react';
import moment from 'moment';
import firebase from '../../config/fbConfig';

import '../../style/components/stories/story-summary.css';

const storageRef = firebase.storage().ref();

class StorySummary extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      imageUrl : ''
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getStoryImg();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  getStoryImg = () => storageRef.child(this.props.story.img).getDownloadURL().then((url) => {
    if(this._isMounted) {this.setState({ imageUrl: url })}
  });

  render() {
    const { story } = this.props
    console.log(story)
    
    return (
      this.state.imageUrl !== '' ?
      <div className='story-summary-container' style={{ backgroundImage: `url(${this.state.imageUrl})` }}>
        <div className='story-summary-content'>
          <span className='story-summary-title'>{story.title}</span>
          <p className='story-summary-author'>Posted by { story.authorFirstName } {story.authorLastName}</p>
          <p className='story-summary-date'>{moment(story.createdAt.toDate().toISOString()).calendar()}</p>
        </div>
      </div> :
      null
    )
  }
}

export default StorySummary;
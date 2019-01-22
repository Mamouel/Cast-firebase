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
      imageUrl : ""
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
      <div className='story-summary-container'>
        <div className='story-summary-content'>
          <img className='story-summary-img' src={this.state.imageUrl} />
          <span className='story-summary-title'>{story.title}</span>
          <p className='story-summary-author'>Posted by { story.authorFirstName } {story.authorLastName}</p>
          <p className='story-summary-date'>{moment(story.createdAt.toDate().toISOString()).calendar()}</p>
        </div>
      </div>
    )
  }
}

export default StorySummary;
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

  getStoryImg = async () => {
    try {
      await storageRef.child(this.props.story.img).getDownloadURL().then((url) => {
        if(this._isMounted) {this.setState({ imageUrl: url })}
      });
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { story } = this.props
    return (
      this.state.imageUrl !== '' && (
      <div  >
        <div className='story-summary-container' style={{ backgroundImage: `url(${this.state.imageUrl})` }}>
          <div>
            <div className='story-summary-title'>
              {story.title}
            </div>
            <div className=''>

              <div className='story-summary-author'>
                Posted by { story.authorFirstName } {story.authorLastName}
              </div>
              <div className='story-summary-date'>
                {moment(story.createdAt.toDate().toISOString()).calendar()}
              </div>
              {}
            </div>
          </div>
        </div>
      </div> 
      )
    )
  }
}

export default StorySummary;

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
      imageUrl : '',
      categoryColor: ''
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getStoryImg();
    this.getStoryCategoryColor(this.props.story);
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

  getStoryCategoryColor = (story) => {
      switch(story.category) {
        case 'Party':
          return this.setState({ categoryColor: 'red' })
        case 'Weekend':
          return this.setState({ categoryColor: 'blue' })
        case 'Anecdote':
          return this.setState({ categoryColor: 'green' })
        case 'Story':
          return this.setState({ categoryColor: 'yellow' })
        case 'Goodies':
        return this.setState({ categoryColor: 'pink' })
        default:
          return this.setState({ categoryColor: 'grey' })

      }
  }
  

  render() {
    const { story } = this.props
    return (
      this.state.imageUrl !== '' && (
      <div  >
        <div className='story-summary-container' style={{ backgroundImage: `url(${this.state.imageUrl})` }}>
            
          <div id='story-title' className='story-summary-title' style={{ backgroundColor: `${this.state.categoryColor}` }}>
            {story.title}
          </div>

          <div className='story-summary-infos'>
            <div className='story-summary-author'>
              By { story.authorFirstName } {story.authorLastName}
            </div>
            <div className='story-summary-date'>
              {moment(story.createdAt.toDate().toISOString()).calendar()}
            </div>
          </div>

        </div>
      </div> 
      )
    )
  }
}

export default StorySummary;

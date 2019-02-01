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
          return this.setState({ categoryColor: '#404040' })
        case 'Weekend':
          return this.setState({ categoryColor: '#4cc3d9' })
        case 'Anecdote':
          return this.setState({ categoryColor: '#7bc8a4' })
        case 'Story':
          return this.setState({ categoryColor: '#ffc65d' })
        case 'Goodies':
        return this.setState({ categoryColor: '#93648d' })
        case 'X':
        return this.setState({ categoryColor: '#f16745' })
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
            

          <div className='story-summary-infos'>
            <div id='story-title' className='story-summary-title' style={{ backgroundColor: `${this.state.categoryColor}` }}>
              {story.title}
            </div>
            <div className='story-summary-category'>
              {story.category}
            </div>
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

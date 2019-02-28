// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import firebase from '../../config/fbConfig';

import '../../style/components/stories/story-summary.scss';

const storageRef = firebase.storage().ref();

type Props = {
  story: Object
}

type State = {
  imageUrl : string,
  categoryColor: string
}

class StorySummary extends Component<Props, State> {
  _isMounted = false;

  constructor(props: Props) {
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

  getStoryCategoryColor = (story: Object) => {
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
    const { story } = this.props;
    const shortStoryContent = story.content.slice(0, 50) + "...";
    return (
      this.state.imageUrl !== '' && (
      <div className="story-summary-card">
        <div className='story-summary-container' style={{ backgroundImage: `url(${this.state.imageUrl})` }}>

            <div className="story-summary-content">
              "{shortStoryContent}"
            </div>
            
            <div className='story-summary-category' style={{ backgroundColor: `${this.state.categoryColor}` }}>
              {story.category}
            </div>
            

        </div>
        <div className="story-infos-ctn">
          <div id='story-title' className='story-summary-title' >
            {story.title}
          </div>
          <div className='story-summary-author'>
            By { story.authorFirstName } {story.authorLastName}
          </div>
          <div className='story-summary-date'>
            {moment(story.createdAt.toDate().toISOString()).calendar()}
          </div>
        </div>
      </div> 
      )
    )
  }
}

StorySummary.propTypes = {
  story: PropTypes.object
};

export default StorySummary;

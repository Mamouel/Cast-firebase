import React, { Component } from 'react';
import moment from 'moment';
import firebase from '../../config/fbConfig';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

  getStoryImg = async () => await storageRef.child(this.props.story.img).getDownloadURL().then((url) => {
    if(this._isMounted) {this.setState({ imageUrl: url })}
  });

  render() {
    const { story } = this.props
    
    return (
      this.state.imageUrl !== '' ?
      <div  >
        <Card className='story-summary-container' style={{ backgroundImage: `url(${this.state.imageUrl})` }}>
          <CardContent>
            <Typography className='story-summary-title' gutterBottom variant='headline' component='h2'>
              {story.title}
            </Typography>
            <Typography className='story-summary-author' type='subheading' component='p'>
              Posted by { story.authorFirstName } {story.authorLastName}
            </Typography>
            <Typography className='story-summary-date' type='caption' component='p'>
              {moment(story.createdAt.toDate().toISOString()).calendar()}
            </Typography>
          </CardContent>
        </Card>
      </div> 
      :
      null
    )
  }
}

export default StorySummary;

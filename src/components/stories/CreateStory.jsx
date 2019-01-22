import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStory } from '../../store/actions/storyActions';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../../config/fbConfig';

import '../../style/components/stories/create-story.css'

class CreateStory extends Component {
  state = {
    title: '',
    content: '',
    img: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.title !== '' && this.state.content !== '') {
      this.props.createStory(this.state);
      this.props.history.push('/');
    } else {
      document.getElementById('create-error').innerHTML = 'All fields are mandatory'
    }
  };

  addImage = async img => {
    try {
    console.log(img)
    const storageRef = firebase.storage().ref();
    const storyImgRef = storageRef.child('images/stories/' + img.name)
    const snapshot = await storyImgRef.put(img);
    console.log(snapshot)
    this.setState({ img: snapshot.metadata.fullPath });
    } 
    catch(err) {
      console.log(err)
    }
  };

  handleImageChange = event => {
    this.addImage(event.target.files[0]);
  };

  removeImage = () => {
    this.setState({ img: '' })
  }

  render() {
    const { auth } = this.props;
    console.log(this.state)

    if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className='create-story-container'>
        <form className='create-story-form' onSubmit={this.handleSubmit}>
          <h5>Create new story</h5>
          <div className='input-fields'>
            <TextField label='Title' type='text' id='title' onChange={this.handleChange} variant='outlined'></TextField>
          </div>
          <div className='input-fields'>
            <TextField label='Content' multiline type='text' id='content' onChange={this.handleChange} variant='outlined'></TextField>
          </div>

          <div>
            <label className='displayInlineBlock'>
              Image
              <input
                name='image'
                type='file'
                className='selectImgInput'
                onChange={this.handleImageChange}
              />
            </label>
            {this.state.img !== '' && (
              <img src={this.state.img} alt='uploaded recipe img' />
            )}
            
          </div>
          {this.state.img !== '' && (
          <button className='removeImage' onClick={this.removeImage}>Remove image</button>
          )}
          
          <div className='btn-ctn'>
            <Button className='create-story-btn' onClick={this.handleSubmit}>Create</Button>
            <div id='create-error'></div>
          </div>
        </form>
        
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createStory: (story) => dispatch(createStory(story))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStory);
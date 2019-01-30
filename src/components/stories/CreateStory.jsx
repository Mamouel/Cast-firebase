import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStory } from '../../store/actions/storyActions';
import { Redirect } from 'react-router-dom';
import firebase from '../../config/fbConfig';

import '../../style/components/stories/create-story.css'

const storageRef = firebase.storage().ref();

class CreateStory extends Component {


  state = {
    title: '',
    content: '',
    img: '',
    category: ''
  };


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const stateValues = Object.values(this.state);
    const filledFields = this.checkStateValues(stateValues);
    if(filledFields === 4) {
      this.props.createStory(this.state);
      this.props.history.push('/stories');
    } else {
      document.getElementById('create-error').innerHTML = 'All fields are mandatory'
    }
  };

  addImage = async img => {
    try {
    const storyImgRef = storageRef.child('images/stories/' + img.name)
    const snapshot = await storyImgRef.put(img);
    this.setState({ img: snapshot.metadata.fullPath });
    } 
    catch(err) {
      console.log(err)
    }
  };

  handleImageChange = event => {
    this.addImage(event.target.files[0]);
  };

  removeImage = async () => {
    try {
     await storageRef.child(this.state.img).delete().then(() => {
        this.setState({ ...this.state, img: '' })
      });
    } catch(err) {
      console.log(err)
    }
  }

  checkStateValues = (stateValues) => {
    const allFieldsFilled = stateValues.filter(element => {
      if(element !== '') return element;
      return null;
    })
    return allFieldsFilled.length;
  }

  getUploadedImg = async () => {
    try {
      await storageRef.child(this.state.img).getDownloadURL().then((url) => {
        var img = document.getElementById('uploaded-img');
        img.src = url;
      });
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    const { auth } = this.props;
    console.log(this.state)
    const stateValues = Object.values(this.state);
    const filledFields = this.checkStateValues(stateValues);

    this.getUploadedImg();

    if (!auth.uid) return <Redirect to='/signin'/>

    return (
      <div className='create-story-container'>
        <form className='create-story-form' onSubmit={this.handleSubmit}>
          <h5 className='create-story-title'>Create new story</h5>

          <div className='categories-input-ctn'>
            <select type='text' name='categories' defaultValue='Choose a category...' id='category' onChange={this.handleChange}>
              <option value=''>Choose a category...</option>
              <option value='Party'>Party</option>
              <option value='Weekend'>Weekend</option>
              <option value='Anecdote'>Anecdote</option>
              <option value='Story'>Story</option>
              <option value='Goodies'>Goodies</option>
              <option value='X'>X</option>
            </select>
          </div>

          <div className='input-fields-ctn'>
            <input className='input-fields' type='text' id='title' placeholder='Title' onChange={this.handleChange}></input>
          </div>

          <div className='input-fields-ctn'>
            <textarea className='input-fields' id='content' placeholder='Content' rows='100' cols='40' onChange={this.handleChange} required></textarea>
          </div>

          <div className='img-input-ctn'>
            
            <div className='input-image-infos'>
              { this.state.img !== '' ? 
              <div className='image-upload'>
                <p className='image-upload-infos'>Image successfully uploaded!</p>
                <p className='label-file remove-btn' onClick={this.removeImage}>Remove image</p>
                <img id='uploaded-img' className='uploaded-img' alt='preview'/>
              </div>
              :
              <div className='image-upload'>
                <label htmlFor='file' className='label-file'>Add image</label>
                <input className='input-image' name='image' id='file' type='file' onChange={this.handleImageChange} />
                <p className='image-upload-infos'>Image needed</p>
              </div> }
            </div>

          </div>
          
          
          <div className='btn-ctn'>

            { 
              filledFields === 4 ?
              <div>
                <button className='primary-btn' onClick={this.handleSubmit}>Create</button>
                <div id='create-error'></div>
              </div> :
              <div>
                <button className='primary-btn disabled' disabled>Create</button>
                <div id='create-error'></div>
              </div>
            }

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
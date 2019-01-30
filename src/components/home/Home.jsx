import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import bannerImg from '../../style/images/banner.png'


import '../../style/components/home/home.css';

class Home extends Component {
  render() {
    const { auth } = this.props
    if (!auth.uid) return <Redirect to='/signup'/>

    return(
      <div className='home-container'>
        <div className='banner'>
          <img src={bannerImg} alt='' className='banner-img' />
          <div className='home-title-ctn'>
            <div className='first-home-title'>
              Stories
            </div>
            <div className='second-home-title'>
              Goodies
            </div>
            <div className='third-home-title'>
              Anecdotes
            </div>  
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories' }
  ])
)(Home);
import React, { Component } from 'react';
// import Notifications from './Notifications';
import StoriesList from '../stories/StoriesList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';


import '../../style/components/home/home.css';

class Home extends Component {
  render() {
    const { stories, auth } = this.props

    if (!auth.uid) return <Redirect to='/signin'/>

    return(
      <div className='home-container'>
        <div>
          <div className='left'>
            <StoriesList stories={stories} />
          </div>
          {/* <div className='right'>
            <Notifications />
          </div> */}
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
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories' }
  ])
)(Home);
import React, { Component } from 'react';
import StoriesList from './StoriesList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Notifications from './../home/Notifications';

import '../../style/components/home/home.css';

class StoriesLibrary extends Component {
  render() {
    const { stories, auth, notifications } = this.props
    if (!auth.uid) return <Redirect to='/signin'/>

    return(
      <div className='home-container'>
        <div className='secondary-banner' >
          <Notifications notifications={notifications} />
        </div>
        <div>
          <div className='left'>
            <StoriesList stories={stories} />
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories', orderBy: ['createdAt', 'desc']  },
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
  ])
)(StoriesLibrary);
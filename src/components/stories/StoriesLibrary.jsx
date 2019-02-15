import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoriesList from './StoriesList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import Notifications from '../layout/Notifications';
import LoadingAnimation from '../layout/LoadingAnimation';

class StoriesLibrary extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { stories, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (stories && stories.length === 0 && notifications && notifications.length === 0) {
      return <LoadingAnimation />
    } else{
      return(
        <div>
          <div >
            <Notifications notifications={notifications} />
          </div>
          <div>
            <div>
              <StoriesList stories={stories} />
            </div>
          </div>
        </div>
      )
    }
  }
};

StoriesLibrary.propTypes = {
  stories: PropTypes.array,
  auth: PropTypes.object.isRequired,
  notifications: PropTypes.array
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
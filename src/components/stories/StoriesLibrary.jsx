// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoriesList from './StoriesList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import LoadingAnimation from '../layout/LoadingAnimation';

type Props = {
  stories: Array<Object>,
  auth: Object,
  notifications: Array<Object>
};


class StoriesLibrary extends Component<Props> {

  render() {
    const { stories, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (stories && stories.length === 0) {
      return <LoadingAnimation />
    } else{
      return(
        <div style={{ paddingTop: 60 }}>
            <StoriesList stories={stories} />
        </div>
      )
    }
  }
};

StoriesLibrary.propTypes = {
  stories: PropTypes.array,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories', orderBy: ['createdAt', 'desc']  },
  ])
)(StoriesLibrary);
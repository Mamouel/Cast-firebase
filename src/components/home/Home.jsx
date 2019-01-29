import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';


import '../../style/components/home/home.css';

class Home extends Component {
  render() {
    const { auth } = this.props
    if (!auth.uid) return <Redirect to='/signup'/>

    return(
      <div className='home-container'>
        <div className='banner' >
          <div className="home-title">
                Stories... and more
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
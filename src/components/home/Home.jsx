import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Typist from 'react-typist';


import '../../style/components/home/home.css';

class Home extends Component {
  render() {
    const { stories, auth } = this.props
    if (!auth.uid) return <Redirect to='/signin'/>

    return(
      <div className='home-container'>
        <div className='banner' >
          <div className="home-title">
            <Typist speed={50}>
                Stories... <Typist.Delay ms={500} /> and more
            </Typist>
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
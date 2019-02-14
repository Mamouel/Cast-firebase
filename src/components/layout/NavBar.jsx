// @flow

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import '../../style/components/layout/navbar.css';

type Props = {
  auth: Object,
  profile: Object,
  stories: Array<Object>,
  history: Object
};


const Navbar = (props: Props) => {
  const { auth, profile, stories, history } = props;

  const links = auth.uid ? <SignedInLinks profile={profile} stories={stories} history={history}/> : <SignedOutLinks />;
  return (
    <nav id='navbar' className='nav-wrapper'>
      <div className='nav-container'>
        <Link to='/'><button className='home-button'>CAST</button></Link>
        {links}
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  stories: PropTypes.array
};


const mapStateToProps = (state, props) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    stories: state.firestore.ordered.stories
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
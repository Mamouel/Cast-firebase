import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import '../../style/components/layout/navbar.css';

const Navbar = (props) => {
  const { auth, profile, stories, history } = props;

  const links = auth.uid ? <SignedInLinks profile={profile} stories={stories} history={history}/> : <SignedOutLinks />;
  return (
    <nav className='nav-wrapper'>
      <div className='nav-container'>
        <Link to='/'><button className='home-button'>CAST</button></Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state, props) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    stories: state.firestore.ordered.stories
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
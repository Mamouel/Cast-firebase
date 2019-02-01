import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import '../../style/components/layout/navbar.css';

const Navbar = (props) => {
  const { auth, profile, stories, history } = props;

  if (!auth.uid) return <Redirect to='/signin'/>

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

const mapStateToProps = (state, props) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    stories: state.firestore.ordered.stories
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
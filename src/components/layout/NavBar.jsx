import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';


import '../../style/components/layout/navbar.css';

const Navbar = (props) => {
  const { auth, profile, stories } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} stories={stories}/> : <SignedOutLinks />;
  return (
    <nav className='nav-wrapper'>
      <div className='nav-container'>
        <Link to='/'><Button className='home-button'>CAST</Button></Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    stories: state.firestore.ordered.stories
  }
}

export default connect(mapStateToProps)(Navbar);
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import Button from '@material-ui/core/Button';

import '../../style/components/layout/navlinks.css';

const SignedInLinks = (props) => {
  return (
    <div className='navlinks'>
      <NavLink to='/create'><Button className='nav-btn'>New Article</Button></NavLink>
      <Button className='nav-btn' onClick={props.signOut} >Log Out</Button>
      <NavLink to='/profile'><Button className='avatar'>{props.profile.initials ? props.profile.initials : 'Guest'}</Button></NavLink>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
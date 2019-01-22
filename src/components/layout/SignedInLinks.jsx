import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import Button from '@material-ui/core/Button';

import '../../style/components/layout/navlinks.css';

const SignedInLinks = (props) => {
  return (
    <ul className='navlinks'>
      <li><NavLink to='/create'><Button>New Article</Button></NavLink></li>
      <li><Button onClick={props.signOut}>Log Out</Button></li>
      <li><NavLink to='/'><Button className='avatar'>{props.profile.initials}</Button></NavLink></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
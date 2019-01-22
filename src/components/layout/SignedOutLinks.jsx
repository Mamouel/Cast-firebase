import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../style/components/layout/navlinks.css';

const SignedOutLinks = () => {
  return (
    <ul className='navlinks'>
      <li><NavLink to='/signup'>Signup</NavLink></li>
      <li><NavLink to='/signin'>Login</NavLink></li>
    </ul>
  )
}

export default SignedOutLinks;
import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../style/components/layout/navlinks.scss';

const SignedOutLinks = () => {
  return (
    <div className='navlinks'>
      <NavLink to='/signup'><button className='nav-btn'>Signup</button></NavLink>
      <NavLink to='/signin'><button className='nav-btn'>Login</button></NavLink>
    </div>
  )
}

export default SignedOutLinks;
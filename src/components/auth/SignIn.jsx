// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect, Link } from 'react-router-dom';

import '../../style/components/auth/signin.css';

type Props = {
  authError: string,
  // auth: object
};

type State = {
  email: string,
  password: string
};

class SignIn extends Component<Props, State> {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const { authError, auth } = this.props;
    
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className='signin-container'>
        <form className='signin-form-container' onSubmit={this.handleSubmit}>
          <h5 className='signin-form-title'>Connect to your account</h5>
          <div className='input-fields-ctn'>
            <input className='input-fields' type='email' id='email' onChange={this.handleChange} placeholder='Email'></input>
          </div>
          <div className='input-fields-ctn'>
            <input className='input-fields' type='password' id='password' onChange={this.handleChange} placeholder='Password'></input>
          </div>
          <button className='primary-btn'>Login</button>
          <div className='login-error'>{authError ? <p>{authError}</p> : null}</div>
          <div className='login-links'>
            <Link to='/signup'>
              <button className='primary-btn special-btn' >Create new account</button>
            </Link>
            <Link to='/'>
              <button className='primary-btn special-btn' >Forgot password ?</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

SignIn.propTypes = {
  authError: PropTypes.string,
  auth: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
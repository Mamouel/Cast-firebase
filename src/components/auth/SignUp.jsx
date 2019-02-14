// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';


import '../../style/components/auth/signup.css';

type Props = {
  authError: string,
  // auth: object
};

type State = {
  email: string,
  password: string,
  firstName: string,
  lastName: string
};

class SignUp extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.email !== '' && this.state.password !== '' && this.state.firstName !== '' && this.state.lastName !== '') {
      this.props.signUp(this.state);
      this.props.history.push('/');
    } else {
      document.getElementById('signup-error').innerHTML = 'All fields are mandatory';
      this.props.history.push('/signup');
    }
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (
      <div className='signup-container'>
        <form className='signup-form-container' onSubmit={this.handleSubmit}>
          <h5 className='signup-form-title'>Create account</h5>
          <div className='input-fields-ctn'>
            <input className='input-fields' type='email' id='email' onChange={this.handleChange} placeholder='Email'></input>
          </div>
          <div className='input-fields-ctn'>
            <input className='input-fields' type='password' id='password' onChange={this.handleChange} placeholder='Password'></input>
          </div>
          <div className='input-fields-ctn'>
            <input className='input-fields' type='text' id='firstName' onChange={this.handleChange} placeholder='First Name'></input>
          </div>
          <div className='input-fields-ctn'>
            <input className='input-fields' type='text' id='lastName' onChange={this.handleChange} placeholder='Last Name'></input>
          </div>
          <div className='signup-btn-ctn'>
            <button className='primary-btn'>Sign Up</button>
            <div id='signup-error' className='signup-error'>{authError ? <p>{authError}</p> : null}</div>
          </div>
        </form>
        
      </div>
    );
  };
};

SignUp.propTypes = {
  auth: PropTypes.object,
  authError: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
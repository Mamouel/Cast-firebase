import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import TextField from '@material-ui/core/TextField';


import '../../style/components/auth/signup.css';

class SignUp extends Component {
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
      document.getElementById('signup-error').innerHTML = 'All fields are mandatory'
    }
  };

  render() {
    const { auth, authError } = this.props;
    // if (auth) return <Redirect to='/' />
    return (
      <div className='signup-container'>
        <form className='signup-form-container' onSubmit={this.handleSubmit}>
          <h5 className='signup-form-title'>Create account</h5>
          <div className='input-fields'>
            <label htmlFor='email'></label>
            <TextField label='Email' type='email' id='email' onChange={this.handleChange} variant='outlined'></TextField>
          </div>
          <div className='input-fields'>
            <label htmlFor='password'></label>
            <TextField label='Password' type='password' id='password' onChange={this.handleChange} variant='outlined'></TextField>
          </div>
          <div className='input-fields'>
            <label htmlFor='firstName'></label>
            <TextField label='First Name' type='text' id='firstName' onChange={this.handleChange} variant='outlined'></TextField>
          </div>
          <div className='input-fields'>
            <label htmlFor='lastName'></label>
            <TextField label='Last Name' type='text' id='lastName' onChange={this.handleChange} variant='outlined'></TextField>
          </div>
          <div className='input-fields'>
            <button className='signup-btn'>Sign Up</button>
            <div id='signup-error' className='signup-error'>{authError ? <p>{authError}</p> : null}</div>
          </div>
        </form>
        
      </div>
    );
  };
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
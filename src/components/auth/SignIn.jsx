import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect, Link } from 'react-router-dom';



import '../../style/components/auth/signin.css';

class SignIn extends Component {
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
          <h5 className='signin-form-title'>Sign In</h5>
          <div className='input-fields'>
            <input className='input-fields-email' label='Email' type='email' id='email' onChange={this.handleChange} variant='outlined'></input>
          </div>
          <div className='input-fields'>
            <input label='Password' type='password' id='password' onChange={this.handleChange} variant='outlined'></input>
          </div>
          <div className='input-fields'>
            <button className='login-btn'>Login</button>
            <div className='login-error'>{authError ? <p>{authError}</p> : null}</div>
          </div>
          <div className='login-links'>
            <Link to='/signup'>
              <button >Create new account</button>
            </Link>
            <Link to='/'>
              <button>Forgot password ?</button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

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
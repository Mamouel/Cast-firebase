import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { search } from '../../store/actions/searchActions';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

import '../../style/components/layout/navlinks.css';

class SignedInLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      searchInput: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.search(this.state.filtered)
    this.props.history.push('/search')
  }

  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value
    });
    this.performSearch(this.state.searchInput.toLowerCase())
  }

  performSearch = (searchTerm) => {
    let currentList = [];
    let newList = [];
    if (searchTerm !== '') {
      currentList = this.props.stories;
      newList = currentList.filter(story => {
        const titleMatch = story.title.toLowerCase();
        const firstNameMatch = story.authorFirstName.toLowerCase();
        const lastNameMatch = story.authorLastName.toLowerCase();
        return titleMatch.includes(searchTerm) 
          || firstNameMatch.includes(searchTerm) 
          || lastNameMatch.includes(searchTerm);
      });

    } else {
      newList = this.props.stories;
    }
    this.setState({
      filtered: newList,
    });
  }



  render() {
    const { profile, signOut } = this.props
    return (
      <div className='navlinks'>
        <form className='search-form' onSubmit={this.handleSubmit}>
          <input
            placeholder='Search username, title, keyword...'
            type='search'
            className='search-input'
            onChange={this.handleChange}
          />
          <button className='search-btn' onClick={this.handleSubmit}><FaSearch /></button>
        </form>
        <NavLink to='/stories'><button className='nav-btn'>All Stories</button></NavLink>
        <NavLink to='/create'><button className='nav-btn'>New Story</button></NavLink>
        <button className='nav-btn' onClick={signOut} >Log Out</button>
        <NavLink to='/profile'><button className='avatar'>{profile.initials ? profile.initials : 'Guest'}</button></NavLink>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    search: (searchTerm) => dispatch(search(searchTerm))
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
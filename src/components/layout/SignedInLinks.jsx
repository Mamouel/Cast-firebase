// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { search } from '../../store/actions/searchActions';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'

import '../../style/components/layout/navlinks.scss';

type Props = {
  auth: Object,
  profile: Object,
  stories: Array<Object>,
  history: Object,
  signOut: () => void,
  search: (searchTerm?: string) => void
};

type State = {
  filtered: Array<Object>,
  searchInput: string
};

class SignedInLinks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filtered: [],
      searchInput: ''
    };
  }

  handleSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.search(this.state.filtered)
    this.props.history.push('/search')
  }

  handleChange = (e: SyntheticEvent<HTMLElement>) => {
    this.setState({
      searchInput: e.target.value
    });
    this.performSearch(this.state.searchInput.toLowerCase())
  }

  performSearch = (searchTerm: string) => {
    let currentList = [];
    let newList = [];
    if (searchTerm !== '') {
      currentList = this.props.stories;
      newList = currentList.filter(story => {
        const titleMatch = story.title.toLowerCase();
        const firstNameMatch = story.authorFirstName.toLowerCase();
        const lastNameMatch = story.authorLastName.toLowerCase();
        const categoryMatch = story.category.toLowerCase();
        return titleMatch.includes(searchTerm) 
          || firstNameMatch.includes(searchTerm) 
          || lastNameMatch.includes(searchTerm)
          || categoryMatch.includes(searchTerm);
      });

    } else {
      newList = this.props.stories;
    }
    this.setState({
      filtered: newList,
    });
  }



  render() {
    const { profile, signOut, auth } = this.props
    return (
      <div className='navlinks'>
        <form className='search-form' onSubmit={this.handleSubmit}>
          <input
            placeholder='Search username, title, keyword...'
            type='search'
            className='search-input'
            onChange={this.handleChange}
          />
          <button className='search-btn' onClick={this.handleSubmit}><FaSearch className="search-icon" /></button>
        </form>
        <NavLink to='/stories'><button className='nav-btn'>All Stories</button></NavLink>
        <NavLink to='/create'><button className='nav-btn create-story-btn'>New Story</button></NavLink>
        <div className="sep-div"/>
        <NavLink to={'/profile/'+ auth.uid}><button className='avatar'>{profile.initials ? profile.initials : 'Guest'}</button></NavLink>
        <button className='nav-btn' onClick={signOut} >Log Out</button>
      </div>
    )
  }
}

SignedInLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  signOut: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    search: (searchTerm) => dispatch(search(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { search } from '../../store/actions/searchActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';


import '../../style/components/layout/navlinks.css';

class SignedInLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      searchInput: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.search(this.state.filtered)
    this.props.history.push("/search")
  }

  handleChange = (e) => {
    this.setState({
      searchInput: e.target.value
    });
    this.performSearch(this.state.searchInput.toLowerCase())
  }

  performSearch = (searchTerm) => {
    console.log(searchTerm)
    let currentList = [];
    let newList = [];
    if (searchTerm !== "") {
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
      filtered: newList
    });
  }



  render() {
    console.log(this.state)
    const { profile, signOut } = this.props
    return (
      <div className='navlinks'>
      <form className='search-form' onSubmit={this.handleSubmit}>
        <TextField
          id="outlined-search"
          label="Search  ..."
          type="search"
          className="search-input"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
        />
        <Button className="search-btn" onClick={this.handleSubmit}>SEARCH</Button>
      </form>
        <NavLink to='/create'><Button className='nav-btn'>New Article</Button></NavLink>
        <Button className='nav-btn' onClick={signOut} >Log Out</Button>
        <NavLink to='/profile'><Button className='avatar'>{profile.initials ? profile.initials : 'Guest'}</Button></NavLink>
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
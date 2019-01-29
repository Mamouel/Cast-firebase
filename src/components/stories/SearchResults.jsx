import React, { Component } from 'react';
import StorySummary from './StorySummary';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../style/components/home/home.css';

class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({ isLoading: false })
  }

  componentWillUnmount() {
    this.setState({ isLoading: true })
  }

  render() {
    
    const { auth, search } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    return(
      (!this.state.isLoading) ?
      <div className='search-result-container'>
        {search && search.map(story => {
        return(
          <Link className='story-link' to={'/story/' + story.id} key={story.id}>
            <StorySummary story={story} />
          </Link>
        )
      })}
      </div> : null
    )
  }

};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth,
    search: state.search
  }
}


export default connect(mapStateToProps)(SearchResults);
import React, { Component } from 'react';
import StorySummary from './StorySummary';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../style/components/stories/stories-list.css';
import LoadingAnimation from '../layout/LoadingAnimation';

class SearchResults extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    this.setState({ isLoading: true });
  }

  render() {
    
    const { auth, search } = this.props;
    if (!auth.uid) return <Redirect to='/signin'/>
    if (search === undefined) return <Redirect to='/'/>
    return(
      (!this.state.isLoading) ?
      <div className='story-list'>
        {search && search.map(story => {
        return(
          <Link className='story-link' to={'/story/' + story.id} key={story.id}>
            <StorySummary story={story} />
          </Link>
        )
      })}
      </div> : <div><LoadingAnimation /></div>
    )
  }

};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    search: state.search
  }
}


export default connect(mapStateToProps)(SearchResults);
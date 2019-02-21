// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StorySummary from './StorySummary';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../style/components/stories/stories-list.css';
import LoadingAnimation from '../layout/LoadingAnimation';

type Props = {
  auth: Object,
  search: Object
};

type State = {
  isLoading: boolean
};

class SearchResults extends Component<Props, State> {

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
    console.log(search.storiesFound.length === 0)
    if (!auth.uid) return <Redirect to='/signin'/>
    if (search.storiesFound.length === 0) return <Redirect to='/stories'/>
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

SearchResults.propTypes = {
  auth: PropTypes.object,
  search: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    search: state.search
  }
}


export default connect(mapStateToProps)(SearchResults);
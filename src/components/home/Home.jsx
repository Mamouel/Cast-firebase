import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, NavLink, Link } from 'react-router-dom';

import StorySummary from '../stories/StorySummary';

import bannerImg from '../../style/images/banner.jpg';
import dikkenek from '../../style/images/dikkenek.jpg';
import oss from '../../style/images/oss.jpg';
import workaholic from '../../style/images/workaholic.jpg';

import '../../style/components/home/home.css';

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { auth, stories } = this.props;
    if (!auth.uid) return <Redirect to='/signup'/>

    return(
      <div className='home-container'>
        <div className='banner'>
          <img src={bannerImg} alt='' className='banner-img' />
          <div className='home-title-ctn'>
            <div className='first-home-title'>
              Stories
            </div>
            <div className='second-home-title'>
              Goodies
            </div>
            <div className='third-home-title'>
              Slipbardages
            </div>  
          </div>
        </div>
        <div className='home-section-ctn'>
          <div className='first-home-section'>
            <div className='first-home-section-img'>
            </div>
            <div className='first-home-section-infos'>

            </div>
          </div>

        </div>
        <div className='home-section-ctn'>
          <div className='second-home-section'>
            <div className='second-home-section-title'>10 latest</div>
            <div className='second-home-section-slider'>
              {stories && stories.slice(0, 10).map(story => {
                return (
                  <Link className='story-link' to={'/story/' + story.id} key={story.id}>
                    <StorySummary story={story} />
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='second-home-section-buttons'>
          <NavLink to='/stories' className='home-btn-links home-btn-ctn1'>
            <div className='home-btn-ctn ' style={{ backgroundImage: `url(${dikkenek})` }}>
              <div className='buttons-label'>Stories</div>
            </div>
          </NavLink>
          <NavLink to='/create' className='home-btn-links home-btn-ctn2'>
            <div className='home-btn-ctn' style={{ backgroundImage: `url(${oss})` }}>
             <div className='buttons-label'>Create your own</div>
            </div>
          </NavLink>
          <NavLink to='/' className='home-btn-links home-btn-ctn1'>
            <div className='home-btn-ctn' style={{ backgroundImage: `url(${workaholic})` }}>
              <div className='buttons-label'>About</div>
            </div>
          </NavLink>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories', orderBy: ['createdAt', 'desc'] }
  ])
)(Home);
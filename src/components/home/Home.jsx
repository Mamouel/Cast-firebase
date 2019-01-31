import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, NavLink, Link } from 'react-router-dom';

import StorySummary from '../stories/StorySummary';
import Notifications from './Notifications';

import bannerImg from '../../style/images/banner.png';
import dikkenek from '../../style/images/dikkenek.jpg';

import oss from '../../style/images/oss.jpg';

import workaholic from '../../style/images/workaholic.jpg';



import '../../style/components/home/home.css';

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { auth, stories, notifications } = this.props;
    console.log(stories)
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
              Anecdotes
            </div>  
          </div>
        </div>
        <div className='home-section-ctn'>
          <div className='first-home-section'>
            <div className='first-home-section-img'>
              <Notifications notifications={notifications} />
            </div>
            <div className='first-home-section-infos'>

            </div>
          </div>

        </div>
        <div className='home-section-ctn'>
          <div className='second-home-section'>
            <div className='second-home-section-slider'>
              {stories && stories.map(story => {
                return (
                  <Link className='story-link' to={'/story/' + story.id} key={story.id}>
                    <StorySummary story={story} />
                  </Link>
                )
              })}
            </div>
            <div className='second-home-section-buttons'>
              <div className='home-btn-ctn home-btn-ctn1' style={{ backgroundImage: `url(${dikkenek})` }}>
                <NavLink to='/stories'><div>Stories</div></NavLink>
              </div>
              <div className='home-btn-ctn home-btn-ctn2' style={{ backgroundImage: `url(${oss})` }}>
                <NavLink to='/create'><div>Create your own</div></NavLink>
              </div>
              <div className='home-btn-ctn home-btn-ctn1' style={{ backgroundImage: `url(${workaholic})` }}>
                <NavLink to='/'><div>About</div></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    stories: state.firestore.ordered.stories,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'stories', limit: 10, orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
  ])
)(Home);
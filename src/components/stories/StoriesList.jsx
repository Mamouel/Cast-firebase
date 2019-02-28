import React from 'react';
import PropTypes from 'prop-types';
import StorySummary from './StorySummary';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';


import '../../style/components/stories/stories-list.scss';

type Props = {
  stories: Array<Object>,
};

const StoryList = (props: Props) => {
  const { stories } = props
  return (
    <div className='story-list'>
      {stories && stories.map(story => {
        return (
          <Link className='story-link' to={'/story/' + story.id} key={story.id}>
            <ScrollAnimation animateIn="fadeIn">
              <StorySummary story={story} />
            </ScrollAnimation>
          </Link>
        )
      })}
    </div>
  )
};

StoryList.propTypes = {
  stories: PropTypes.array
}

export default StoryList;
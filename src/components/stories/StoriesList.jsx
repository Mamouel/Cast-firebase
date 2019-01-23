import React from 'react';
import StorySummary from './StorySummary';
import { Link } from 'react-router-dom';

import '../../style/components/stories/stories-list.css';

const storyList = ({ stories }) => {
  return (
    <div className='story-list'>
      {stories && stories.map(story => {
        return(
          <Link className='story-link' to={'/story/' + story.id} key={story.id}>
            <StorySummary story={story} />
          </Link>
        )
      })}
    </div>
  )
};

export default storyList;
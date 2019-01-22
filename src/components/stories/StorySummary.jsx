import React from 'react';
import moment from 'moment';

import '../../style/components/stories/story-summary.css';

const StorySummary = ({story}) => {
  console.log(story)
  return (
    <div className='story-summary-container'>
      <div className='story-summary-content'>
        <span className='story-summary-title'>{story.title}</span>
        <p className='story-summary-author'>Posted by { story.authorFirstName } {story.authorLastName}</p>
        <p className='story-summary-date'>{moment(story.createdAt.toDate().toISOString()).calendar()}</p>
      </div>
    </div>
  )
}

export default StorySummary;
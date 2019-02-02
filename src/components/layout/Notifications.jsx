import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';


import '../../style/components/layout/notifications.css';
import LoadingAnimation from './LoadingAnimation';


const Notifications = (props) => {
  const { notifications } = props;

  console.log(notifications)

  if (notifications && notifications.length !== 0) {

    return (
      <div className='notifications-ctn'>
        <div className='notifications-card'>
          <span className='notifications-title'>Last Updates</span>
          <ul className='notifications-list'>
            {notifications && notifications.map(notification => {
              return (
                
                <li className='notification-ctn' key={notification.id}>
                  <div className='notification-infos'>
                    <Link to={'/profile/' + notification.authorId} className='notification-user-link' >
                      <span className='notification-user'>{notification.user}</span>
                    </Link>
                    <span className='notification-content'>{notification.content}</span>
                  </div>
                  <div className='notification-date'>
                    {moment(notification.time.toDate()).fromNow()}
                  </div>            
                </li>
                
              )                
            })}
          </ul>     
        </div>
      </div>
    ) 
  } else {
    return (
      <LoadingAnimation />
    )
  }
}

export default Notifications;



import React from 'react';
import moment from 'moment';


import '../../style/components/layout/notifications.css';


const Notifications = (props) => {
  const { notifications } = props;
  console.log(notifications)
  return(
    <div className='notifications-ctn'>
      <div className='notifications-card'>
        <span className='notifications-title'>Last Updates</span>
        <ul className='notifications-list'>
          {notifications && notifications.map(notification => {
            return (
              <li className='notification-ctn' key={notification.id}>
                <div className='notification-infos'>
                  <span className='notification-user'>{notification.user}</span>
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
}

export default Notifications;



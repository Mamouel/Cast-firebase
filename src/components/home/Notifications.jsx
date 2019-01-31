import React from 'react';
import moment from 'moment';


const Notifications = (props) => {
  const { notifications } = props;
  console.log(notifications)
  return(
    <div className='notifications-ctn'>
      <div className='notifications-card'>
        <div className='notifications-card-content'>
          <span className=''>Notifications</span>
          <ul className='notifications-list'>
            {notifications && notifications.map(notification => {
              return (
                <li key={notification.id}>
                  <span>{notification.user}</span>
                  <span>{notification.content}</span>
                  <div className='notification-date'>
                    {moment(notification.time.toDate()).fromNow()}
                  </div>            
                </li>
              )                
            })}
          </ul>     
        </div>
      </div>
    </div>
  )
}

export default Notifications;



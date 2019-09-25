import './assets/notifications.css';

import React from 'react';

import { Notification, INotification, INotificationExtendProps } from './Notification';
import classes from './classes';

export type INotifications = Array<INotification>;
export interface INotificationsProps extends INotificationExtendProps {
  notifications: INotifications
}

export function Notifications(
  { notifications, ...props }: INotificationsProps
) {
  return (
    <div className={classes.root}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          {...props}
        />
      ))}
    </div>
  );
}

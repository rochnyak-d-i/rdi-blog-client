import './assets/notifications.css';

import React from 'react';

import { Notification, INotification, ICloseHandler } from './Notification';
import classes from './classes';

export type INotifications = Array<INotification>;
export interface INotificationsProps {
  notifications: INotifications,
  onClose: ICloseHandler
}

export function Notifications({ notifications, onClose }: INotificationsProps) {
  return (
    <div className={classes.root}>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          {...notification}
          onClose={onClose}
        />
      ))}
    </div>
  );
}

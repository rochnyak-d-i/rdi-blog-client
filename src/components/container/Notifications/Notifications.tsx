import React, { useCallback } from 'react';
import {
  Notifications,
  INotificationsProps
} from '@components/common/Notifications/Notifications';
import { useStoreState, useDispatch } from '@state/index';
import { removeNotification } from '@state/actions/removeNotification';

export type INotificationsContainerProps =
  Omit<INotificationsProps, 'notifications' | 'onClose'>;

export function NotificationsContainer(props: INotificationsContainerProps) {
  const { notifications } = useStoreState();
  const dispatch = useDispatch();

  /**
   * Event handler to then close notification
   */
  const handleClose = useCallback((id: number) => {
    dispatch(removeNotification(id));
  }, [dispatch]);

  return (
    <Notifications
      {...props}
      notifications={notifications}
      onClose={handleClose}
    />
  );
}

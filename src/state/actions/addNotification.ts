import { INotification } from '@components/common/Notifications/Notification';
import { ActionType, AddNotification } from './actions';

export type INotificationParam = Omit<INotification, 'id'> & {id?: number};

export function addNotification(
  notification: INotificationParam
): AddNotification {
  const id: number = notification.id || Date.now();

  return {
    type: ActionType.ADD_NOTIFICATION,
    payload: {
      notification: { id, ...notification }
    }
  };
}

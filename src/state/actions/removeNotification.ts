import { ActionType, RemoveNotification } from './actions';

export function removeNotification(id: number): RemoveNotification {
  return {
    type: ActionType.REMOVE_NOTIFICATION,
    payload: { id }
  };
}

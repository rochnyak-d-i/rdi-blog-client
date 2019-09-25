import { RootAction, ActionType } from './actions/actions';
import { IStateAuth, IStateSearch, IStateError, IStateNotifications, IStateType } from './state';

function authReducer(state: IStateAuth, action: RootAction): IStateAuth {
  return state;
}
function searchReducer(state: IStateSearch, action: RootAction): IStateSearch {
  switch (action.type) {
    case ActionType.SET_SEARCH_PHRASE:
      return Object.assign({}, state, {phrase: action.payload.phrase});
  }

  return state;
}
function errorReducer(state: IStateError, action: RootAction): IStateError {
  switch(action.type) {
    case ActionType.SET_ERROR:
      return action.payload.error;
    case ActionType.CLEAR_ERROR:
      return null;
  }

  return state;
}
function notificationsReducer(state: IStateNotifications, action: RootAction) {
  switch (action.type) {
    case ActionType.ADD_NOTIFICATION:
      return state.concat(action.payload.notification);
    case ActionType.REMOVE_NOTIFICATION:
      return state.filter(notification =>
        notification.id !== action.payload.id);
  }

  return state;
}

/**
 * Implementation of the reducer in Redux style
 *
 * @param {RootAction}  action
 * @param {IStateType}  state   current state
 * @returns {IStateType}  new state
 */
export function reducer(state: IStateType, action: RootAction): IStateType {
  return {
    auth: authReducer(state.auth, action),
    search: searchReducer(state.search, action),
    error: errorReducer(state.error, action),
    notifications: notificationsReducer(state.notifications, action)
  };
}

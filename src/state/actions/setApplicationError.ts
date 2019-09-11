import { ActionType, SetApplicationError } from './actions';

export function setApplicationError(error: Error): SetApplicationError {
  return {
    type: ActionType.SET_ERROR,
    payload: {error}
  };
}

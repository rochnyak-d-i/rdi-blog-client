import { ActionType, ClearApplicationErrorAction } from './actions';

export function clearApplicationError(): ClearApplicationErrorAction {
  return {
    type: ActionType.CLEAR_ERROR,
    payload: {}
  };
}

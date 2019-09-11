import { Dispatch } from 'react';
import { RootAction } from './actions/actions';

export type IDispatch = Dispatch<RootAction>;
export type IActionFn = (action: IDispatch) => void;
export type ThunkType = (action: RootAction | IActionFn) => void;

export function thunk(dispatch: IDispatch): ThunkType {
  return action => {
    if (typeof action === 'function') {
      return action(dispatch);
    }

    return dispatch(action);
  }
}

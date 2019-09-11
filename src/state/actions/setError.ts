import { HttpError } from '@utils/HttpError';
import { IActionFn } from '../thunk';
import { setApplicationError } from './setApplicationError';

export function setError(error: Error, {isAppError = false} = {}): IActionFn {
  console.error(error);

  return dispatch => {
    if (error instanceof HttpError && error.isUnauthorized()) {
      // showAuthForm
    }
    else if (isAppError) {
      dispatch(setApplicationError(error));
    }
    else {
      // show message
    }
  };
}

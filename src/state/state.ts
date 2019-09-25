import { INotifications } from '@components/common/Notifications/Notifications';
import { HttpError } from '@utils/HttpError';

export interface IStateAuth {
  isAuth: boolean,
  token: string
}

export interface IStateSearch {
  phrase: string,
  paramName: string
}

export type IStateError = null | Error | HttpError<any>;

export type IStateNotifications = INotifications;

export interface IStateType {
  auth: IStateAuth,
  search: IStateSearch,
  error: IStateError,
  notifications: IStateNotifications
}

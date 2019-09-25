import { IStateType } from '@state/index';

export function getInitialState(): IStateType {
  const params = new URLSearchParams(window.location.search);

  return {
    auth: {
      isAuth: false,
      token: '',
    },

    search: {
      paramName: 'q',
      phrase: params.get('q') || ''
    },

    error: null,

    notifications: []
  };
}

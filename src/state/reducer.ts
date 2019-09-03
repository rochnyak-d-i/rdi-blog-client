import { RootAction } from './actions/actions';
import { IStateAuth, IStateSearch, IStateType } from './state';

function authReducer(state: IStateAuth, action: RootAction): IStateAuth {
  return state;
}
function searchReducer(state: IStateSearch, action: RootAction): IStateSearch {
  switch (action.type) {
    case 'SET_SEARCH_PHRASE':
      return Object.assign({}, state, {phrase: action.payload.phrase});
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
    search: searchReducer(state.search, action)
  };
}

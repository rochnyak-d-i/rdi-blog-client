import { ActionType, SetSearchPhraseAction } from './actions';

export function setSearchPhrase(phrase: string): SetSearchPhraseAction {
  return {
    type: ActionType.SET_SEARCH_PHRASE,
    payload: { phrase }
  };
}

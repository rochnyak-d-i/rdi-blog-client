export enum ActionType {
  SET_SEARCH_PHRASE = 'SET_SEARCH_PHRASE',

  SET_ERROR = 'SET_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR'
}

export type Action<T extends ActionType, P = void> = {
  type: T;
  payload: P;
}

export type SetSearchPhraseAction =
  Action<ActionType.SET_SEARCH_PHRASE, { phrase: string }>;

export type SetApplicationError =
  Action<ActionType.SET_ERROR, { error: Error }>;
export type ClearApplicationErrorAction = Action<ActionType.CLEAR_ERROR, {}>

export type RootAction =
  SetSearchPhraseAction |
  SetApplicationError |
  ClearApplicationErrorAction;

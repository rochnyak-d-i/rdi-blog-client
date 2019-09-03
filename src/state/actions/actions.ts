export enum ActionType {
  SET_SEARCH_PHRASE = 'SET_SEARCH_PHRASE'
}

export type Action<T extends ActionType, P> = {
  type: T;
  payload: P;
}

export type SetSearchPhraseAction =
  Action<ActionType.SET_SEARCH_PHRASE, { phrase: string }>;
export type RootAction = SetSearchPhraseAction;

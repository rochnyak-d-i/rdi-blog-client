import React, {
  useReducer, useContext, createContext,
  Dispatch, ReactNode
} from 'react';
import { IStateType } from './state';
import { RootAction } from './actions/actions';

// kludge for context types
export const DispatchContext = createContext({} as Dispatch<RootAction>);
export const StoreStateContext = createContext({} as IStateType);

export interface IStateProvider {
  reducer: (state: IStateType, action: RootAction) => IStateType,
  initialState: IStateType;
  children?: ReactNode;
};
export function StateProvider(props: IStateProvider) {
  const [state, dispatch] = useReducer(props.reducer, props.initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StoreStateContext.Provider value={state}>
        {props.children}
      </StoreStateContext.Provider>
    </DispatchContext.Provider>
  );
}

export function useDispatch() {
  return useContext(DispatchContext);
}
export function useStoreState() {
  return useContext(StoreStateContext);
}

import React, {
  useReducer, useContext, useMemo,
  createContext, ReactNode
} from 'react';
import { IStateType } from './state';
import { RootAction } from './actions/actions';
import { ThunkType, thunk } from './thunk'

// kludge for context types
export const DispatchContext = createContext({} as ThunkType);
export const StoreStateContext = createContext({} as IStateType);

export interface IStateProvider {
  reducer: (state: IStateType, action: RootAction) => IStateType,
  initialState: IStateType;
  children?: ReactNode;
};
export function StateProvider(props: IStateProvider) {
  const [state, dispatch] = useReducer(props.reducer, props.initialState);
  const enhancedDispatch = useMemo(() => thunk(dispatch), [dispatch]);

  return (
    <DispatchContext.Provider value={enhancedDispatch}>
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

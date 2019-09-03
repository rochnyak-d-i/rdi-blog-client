import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SearchForm, ISubmitHandlerProps } from '../../common/SearchForm/SearchForm';
import { useStoreState, useDispatch } from '@state/index';
import { setSearchPhrase } from '@state/actions/setSearchPhrase';

export const SearchFormContainer = withRouter(
  function ({location, history, ...props}: RouteComponentProps) {
    const { search } = useStoreState();
    const dispatch = useDispatch();

    /**
     * Starts navigating to the search page
     *
     * @param {ISubmitHandlerProps} submitProps
     * @returns void
     */
    function goSearch(submitProps: ISubmitHandlerProps): void {
      history.push(
        `${submitProps.path}?${submitProps.name}=${submitProps.query}`
      );
    }

    return (
      <SearchForm
        value={search.phrase}
        path="/search"
        name={search.paramName}
        onSubmit={goSearch}
        onChangeValue={newValue=> dispatch(setSearchPhrase(newValue))}
        {...props}
      />
    );
  }
);

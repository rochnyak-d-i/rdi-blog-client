import React, { useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { SearchForm, ISubmitHandlerProps } from '../../common/SearchForm/SearchForm';

export const SearchFormContainer = withRouter(
  function ({location, history, ...props}: RouteComponentProps) {
    const queryName = 'q';
    const query = useMemo(() => {
      const params = new URLSearchParams(location.search);

      return params.get(queryName) || '';
    }, [location.search]);

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
        initValue={query}
        path="/search"
        name={queryName}
        onSubmit={goSearch}
        {...props}
      />
    );
  }
)

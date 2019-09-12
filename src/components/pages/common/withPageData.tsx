import React, { useEffect, useState, ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from '@state/index';
import { setError } from '@state/actions/setError';

type PageDataProps<T, P, R> = T & R & RouteComponentProps<P>;

export function withPageData<T, P, R = {}> (
  Page: ComponentType<T>,
  PageLoading: ComponentType,
  fetchData: (params: P) => Promise<R>
): ComponentType<PageDataProps<T, P, R>> {
  function PageWithData(props: PageDataProps<T, P, R>) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<R>();
    const dispatch = useDispatch();

    useEffect(() => {
      fetchData(props.match.params)
        .then(setData)
        .catch(error => dispatch(setError(error, {isAppError: true})))
        .then(() => setLoading(false));
    }, [props.location]);

    if (loading) {
      return (<PageLoading />);
    }

    return (<Page {...props} {...data} />);
  }
  PageWithData.displayName = `withPageData(${Page.displayName})`;

  return PageWithData;
}

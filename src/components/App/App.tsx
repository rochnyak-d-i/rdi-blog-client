import React, { useEffect, PureComponent, ErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { AppBody } from './Body';
import { AppError } from './Error';
import { NotificationsContainer } from '@components/container/Notifications/Notifications';

import { useStoreState, DispatchContext } from '@state/index';
import { setApplicationError } from '@state/actions/setApplicationError';
import { clearApplicationError } from '@state/actions/clearApplicationError';

export interface AppProps extends RouteComponentProps {}

/**
 * Boundary component for application
 */
class AppBoundary extends PureComponent<AppProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const dispatch = this.context;

    dispatch(setApplicationError(error));
  }

  componentDidUpdate(prevProps: AppProps) {
    if (this.props.location !== prevProps.location) {
      const dispatch = this.context;

      dispatch(clearApplicationError());
    }
  }

  render() {
    return this.props.children;
  }
}
AppBoundary.contextType = DispatchContext;

/**
 * Reset scroll page
 */
function resetScrollPage() {
  const node = document.documentElement;

  if ('scrollTo' in node) {
    node.scrollTo(0, 0)
  }
  else {
    (node as HTMLBodyElement).scrollTop = 0;
  }
}

/**
 * Application component
 */
export const App = withRouter(function(props: AppProps) {
  const state = useStoreState();

  useEffect(resetScrollPage, [props.location]);

  return (
    <AppBoundary {...props}>
      <Header />
      <NotificationsContainer />

      <main style={{height: '300px'}}>
        {state.error
          ? <AppError error={state.error} />
          : <AppBody />
        }
      </main>

      <Footer />
    </AppBoundary>
  );
});

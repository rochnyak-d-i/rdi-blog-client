import React, { PureComponent, ErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { AppBody } from './Body';
import { AppError } from './Error';

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

      this._resetScroll();
    }
  }

  /**
   * Reset scroll page
   */
  private _resetScroll(): void {
    const node = document.body;

    if ('scrollTo' in node) {
      node.scrollTo(0, 0)
    }
    else {
      (node as HTMLBodyElement).scrollTop = 0;
    }
  }

  render() {
    return this.props.children;
  }
}
AppBoundary.contextType = DispatchContext;

/**
 * Application component
 */
export const App = withRouter(function(props: AppProps) {
  const state = useStoreState();

  return (
    <AppBoundary {...props}>
      <Header />

      <main>
        {state.error
          ? <AppError error={state.error} />
          : <AppBody />
        }
      </main>

      <Footer />
    </AppBoundary>
  );
});

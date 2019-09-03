// import 'normalize.css';
import './index.css';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { StateProvider, reducer } from '@state/index';
import { App } from '@components/App/App';
import { getInitialState } from './getInitialState';

const initialState = getInitialState();

const rootElement = (
  <StateProvider reducer={reducer} initialState={initialState}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StateProvider>
);

render(rootElement, document.getElementById('root'));

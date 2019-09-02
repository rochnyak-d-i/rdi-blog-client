// import 'normalize.css';
import './index.css';

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App/App';

const rootElement = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

render(rootElement, document.getElementById('root'));

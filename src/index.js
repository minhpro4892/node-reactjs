// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { Provider } from "react-redux";
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore'

import Routes from './routes';

import './index.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('root')
);

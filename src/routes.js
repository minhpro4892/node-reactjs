// src/routes.js
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Login from './components/Login';
import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Login} />
    <Route path="/app" component={App} />
    <Route path="/about" component={About} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;

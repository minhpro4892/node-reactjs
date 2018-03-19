// src/components/App/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';
import { socketAuth } from '../../utils/socketUtils.js';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {},
    this.logout = this.logout.bind(this);
    this.socketAuthenticationCallback = this.socketAuthenticationCallback.bind(this);
    this.socketDisconnectCallback = this.socketDisconnectCallback.bind(this);
    this.socketReconnectAttemptCallback = this.socketReconnectAttemptCallback.bind(this);

  }

  componentDidMount() {
    const { user, menuHandle } = this.props;
    const { router } = this.context;
    const path = this.props.location.pathname;
    // If this page is restricted, go to loginPage first.
    // (But pass on this page's path in order to redirect back upon login)
    if (!user) {
      router.push(`/login?redirect=${path}`);
    } else {
      this.initSystemData();
    }
  }

  initSystemData() {
    socketAuth('minh', this.socketAuthenticationCallback, this.socketDisconnectCallback, this.socketReconnectAttemptCallback);
  }

  socketAuthenticationCallback(payload) {

  }

  socketDisconnectCallback(payload) {

  }

  socketReconnectAttemptCallback(payload) {

  }

  logout() {
    console.log('debug click logout');
    const { user } = this.props;
    this.props.logout(user);
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('App', className)} {...props}>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }

}



App.propTypes = {
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

App.childContextTypes = {

}

function mapStateToProps(state) {
    const { auth } = state;
    if(auth) {
      return {
        user: auth.user,
      };
    }

    return { user: null };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);;

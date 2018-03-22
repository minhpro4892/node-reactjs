// src/components/App/index.js
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { logout } from '../../actions/userAction';
import * as commonAction from '../../actions/commonAction';
import { socketAuth } from '../../utils/socketUtils.js';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './style.css';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';


class App extends Component {
  constructor() {
    super();
    this.state = {},
    this.handleLogout = this.handleLogout.bind(this);
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
    this.props.commonAction.getUser();
    this.props.commonAction.getArticle();
  }

  socketAuthenticationCallback(payload) {

  }

  socketDisconnectCallback(payload) {

  }

  socketReconnectAttemptCallback(payload) {

  }

  handleLogout() {
    const { user } = this.props;
    this.props.logout(user);
  }

  render() {
    const { className, ...props } = this.props;
    console.log(this.props.children)
    return (
      <div className="wrapper">
        <Header
          logout={this.handleLogout}
          title="Demo App"
        />
        <SideBar />
        <article className="main">
          {this.props.children}
        </article>
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
    commonAction: () => dispatch(commonAction()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);;

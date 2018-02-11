import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../actions/userAction';
import './style.css'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            submitted: false
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleRememberMe = this.handleRememberMe.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleRememberMe(e) {
        this.setState({ rememberMe: e.target.checked });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true })
        if (this.state.submitted) {
            console.log(this.props)
            this.props.login(this.state.username, this.state.password, this.state.rememberMe);
        }
    }

    render() {
        return (
            <div className={'login-body'} horizontal>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleUsernameChange} />                       
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                        <div className="form-group">
                            <input type="checkbox" name="rememberMe" checked={this.state.rememberMe} value={this.state.rememberMe} onChange={this.handleRememberMe} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth } = state;
    if (auth) {
        return {
            user: auth.user,
            loginError: auth.loginError
        };
    }

    return { user: null };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, pass, rememeberMe) => {
            dispatch(login(username, pass, rememeberMe))
        }
    }
}

export default connect(mapDispatchToProps, mapStateToProps)(LoginPage);
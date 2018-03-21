import React, { Cmponent } from 'react';
import PropTypes from 'prop-types'
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

    componentWillMount() {
        if (this.props.user) {
            // logged in, let's show redirect if any, or show home
            try {
                const redirect = this.props.location.query.redirect;
                this.context.router.replace(redirect);
            } catch (err) {
                this.context.router.replace("/");
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            // logged in, let's show redirect if any, or show home
            try {
                const redirect = this.props.location.query.redirect;
                this.context.router.replace(redirect);
            } catch (err) {
                this.context.router.replace("/");
            }
        }
        if (nextProps.loginError) {
            this.setState({ errorCode: nextProps.loginError.errorCode })
        }
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
            this.props.login(this.state.username, this.state.password, this.state.rememberMe);
        }
    }

    render() {
        return (
            <div className='login-body' horizontal>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control mr-l-20" name="username" value={this.state.username} onChange={this.handleUsernameChange} />                       
                        </div>
                        <div className='form-group mr-t-10'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control mr-l-20" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        </div>
                        <div className="remember-box form-group mr-t-10">
                            <input type="checkbox" name="rememberMe" checked={this.state.rememberMe} value={this.state.rememberMe} onChange={this.handleRememberMe} />
                            <label><a href="/forgot-password"><label>Forgot Password</label></a></label>
                        </div>
                        <div className="form-group mr-t-20">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

LoginPage.propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.object,
    location: PropTypes.object
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
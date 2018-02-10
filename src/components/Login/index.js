import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../actions/userAction';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange(e) {
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
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

export default LoginPage;
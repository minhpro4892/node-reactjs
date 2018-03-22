import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'

class User extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let { props } = this.props;
        return (
            <p>User page</p>
        );
    }
}
User.contextTypes = {
    user: PropTypes.object
}

export default User;
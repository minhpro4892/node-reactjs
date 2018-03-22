import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'

class DashBoard extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let { props } = this.props;
        return (
            <p>DashBoard page</p>
        );
    }
}
DashBoard.contextTypes = {
    user: PropTypes.object
}

export default DashBoard;
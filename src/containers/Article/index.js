import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'

class Aricle extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let { props } = this.props;
        return (
            <p>Article page</p>
        );
    }
}
Aricle.contextTypes = {
    user: PropTypes.object
}

export default Aricle;
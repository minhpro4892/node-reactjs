import React, { Component } from 'react';
import './style.css';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import PropTypes from 'prop-types'
import { Link } from "react-router";

class SideBar extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let { props } = this.props;
        return (
            <div className="aside aside-1">
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/users">User</Link></li>
                    <li><Link to="/articles">Article</Link></li>
                </ul>
            </div>
        );
    }
}
SideBar.contextTypes = {
    user: PropTypes.object
}

export default SideBar;
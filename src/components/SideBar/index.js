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

    getMenu() {
        var defaultMenu = [
            { url: '/', title: "Dashboard" },
            { url: '/users', title: "User" },
            { url: '/articles', title: "Article"},
            { url: '/reservation', title: "Reservation"}
        ]

        var menuItems = defaultMenu.map((item, index) => {
            return (
                <li key={index} className={"menu-item active" ? "menu-item" : "menu-item active"}>
                    <Link to={item.url}>{item.title}</Link>
                </li>
            )
        })
        return menuItems;
    }

    render() {
        let { props } = this.props;
        return (
            <div className="aside sidebar-wrapper mr-t-50">
                <ul className="sidebar-nav">
                { this.getMenu() }
                </ul>
            </div>
        );
    }
}

SideBar.contextTypes = {
    user: PropTypes.object
}

export default SideBar;
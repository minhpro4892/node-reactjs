import React, { Component } from 'react';
import './style.css';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router";

import PropTypes from 'prop-types'

class Header extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const { props } = this.props;
        return (
            <Navbar className="navbar-fixed-top">
                <div>
                    {this.props.title}
                </div>
                <Nav pullRight>
                    <NavItem eventKey={1} onClick={()=> this.props.logout()}>
                        Logout
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}
Header.contextTypes = {
    user: PropTypes.object
}

export default  Header;
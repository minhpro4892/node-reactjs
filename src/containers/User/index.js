import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'

class User extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    renderDataList () {
        return (
            <tr>
                <td>Joh.Doe</td>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                <td>01667288210</td>
                <td>8 Quang trung</td>
            </tr>
        )
    }

    render() {
        let { props } = this.props;
        return (
            <div className="content">
                <div className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {    this.renderDataList()
                        }
                    </tbody>
                </div>
            </div>
        );
    }
}
User.contextTypes = {
    user: PropTypes.object
}

export default User;
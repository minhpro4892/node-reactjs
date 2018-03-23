import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import PropTypes from 'prop-types';
import _ from "lodash";
import moment from 'moment';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class User extends Component {
    constructor() {
        super();
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userList != nextProps.userList) {
            this.setState({ userList: nextProps.userList });
        }

    }

    handleMenuClick(evenKey, data) {
        
    }

    renderDataList () {
        return (
            _.isArray(this.state.userList) && this.state.userList.length > 0 ?
            this.state.userList.map((item, index) => {
                return (
                    <tr key={index}>
                        <td scope="row">{item.username}</td>
                        <td scope="row">{item.firstName}</td>
                        <td scope="row">{item.lastName}</td>
                        <td scope="row">{item.email}</td>
                        <td scope="row">{item.phoneNumber}</td>
                        <td scope="row">{item.address}</td>
                        <td scope="row">{item.birthyear ? moment(item.birthyear).format("MM/DD/YYYY") : "N/A"}</td>
                        <td scope="row">{item.roleName}</td>
                        <td scope="row">{item.isActive ? 'Active' : 'Inactive'}</td>
                        <td scope="row">{
                            <DropdownButton title="Action" id="basic-nav-dropdown" onSelect={(evenKey) => this.handleMenuClick(evenKey, item)}>
                                <MenuItem eventKey={1}>Edit</MenuItem>
                                <MenuItem eventKey={2}>Delete</MenuItem>
                            </DropdownButton>
                        }</td>
                    </tr>
                )
            }) : <tr>
                <td>Not data found</td>
            </tr>
        )
    }

    render() {
        let { props } = this.props;
        return (
            <div className="content">
                <div className="table table-bordered fill-height">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Birth Year</th>
                            <th>Role Name</th>
                            <th>Status</th>
                            <th>Actions</th>
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
    user: PropTypes.object,
}

function mapStateToProps(state) {
    const { commonData } = state;
    return {
        userList: commonData.userList
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
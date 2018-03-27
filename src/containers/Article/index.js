import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import _ from "lodash";
import { ButtonToolbar, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../actions/articleAction';
import { socketAuth } from '../../utils/socketUtils.js';
import AddEdit from './AddEdit';

class Article extends Component {
    constructor() {
        super();
        this.state = {
            articleList: [],
            detailItem: {},
            showDiaLog: false
        }
        this.closeDialog = this.closeDialog.bind(this);
        this.socketAuthenticationCallback = this.socketAuthenticationCallback.bind(this);
        this.socketDisconnectCallback = this.socketDisconnectCallback.bind(this);
        this.socketReconnectAttemptCallback = this.socketReconnectAttemptCallback.bind(this);
    }

    componentDidMount() {
        socketAuth(this.props.user.username, this.socketAuthenticationCallback, this.socketDisconnectCallback, this.socketReconnectAttemptCallback);
    }

    socketAuthenticationCallback(payload) {
  
    }
  
    socketDisconnectCallback(payload) {
  
    }
  
    socketReconnectAttemptCallback(payload) {
  
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.articleList != nextProps.articleList) {
            this.setState({ articleList: nextProps.articleList });
        }
    }

    closeDialog() {
        this.setState({ showDiaLog: false, detailItem: {} })
    }

    handleMenuClick(eventKey, item) {
        var self = this;
        switch(eventKey) {
            case 'Edit': {
                self.props.articleActions.getOneArticle({ articleId: item._id }).then(data => {
                    if (data.ok) {
                        self.setState({ detailItem: data.res, showDiaLog: true });
                    }
                })
                break;
            }
            case 'Add': {
                this.setState({ showDiaLog: true, detailItem: {} });
                break;
            }
            case 'Export': {
                self.props.articleActions.exportArticleToCSV().then((data) => {
                    if (data.ok) {
                        console.log('Get CSV file');
                    }
                })
                break;
            }
        }
    }
    
    renderDataList () {
        return (
            _.isArray(this.state.articleList) && this.state.articleList.length > 0 ?
            this.state.articleList.map((item, index) => {
                return (
                    <tr key={index}>
                        <td scope="row">{item.title}</td>
                        <td scope="row">{item.content}</td>
                        <td scope="row">{
                            <Button bsStyle="primary" onClick={(e) => this.handleMenuClick("Edit", item)}>Edit</Button>
                        }</td>
                    </tr>
                )
            }) : <tr>
                <td>Not data found</td>
            </tr>
        )
    }

    render() {
        return (
            <div className="content">
                <ButtonToolbar className="button-layout mr-b-20">
                    <Button bsStyle="success" onClick={(e) => this.handleMenuClick("Add", e)}>Add</Button>
                    <Button bsStyle="default" onClick={(e) => this.handleMenuClick("Export", e)}>Export to CSV</Button>
                </ButtonToolbar>
                <div className="table table-bordered fill-height">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {    this.renderDataList()
                        }
                    </tbody>
                </div>
                <AddEdit detailItem={this.state.detailItem} showDiaLog={this.state.showDiaLog} closeDialog={this.closeDialog} router={this.props.router}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { commonData, auth } = state;
    return {
        user: auth.user,
        articleList: commonData.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        articleActions:  bindActionCreators(articleActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
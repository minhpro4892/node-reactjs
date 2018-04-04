import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import _ from "lodash";
import { ButtonToolbar, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as socketActions from '../../actions/socketActions';
import * as articleActions from '../../actions/articleAction';
import { socketApi, socketAuth } from '../../utils/socketUtils.js';
import AddEdit from './AddEdit';
import { socketConfig } from '../../constants/socketConfigs';

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
        if (payload.res && payload.res.username) {
            this.props.socketActions.socketAuthenticated(payload.res.username);
        }
        socketApi.on(socketConfig.join_room, function(data) {
            console.log('Joined room successfully');
        });
        socketApi.on(socketConfig.update_total_number, function(data){
            console.log('Update total number: '+JSON.stringify(data));
        });
        socketApi.on(socketConfig.receive.article.addArticle, function (data) {
            console.log('Add article successfully');
        });
        socketApi.on(socketConfig.receive.article.updateArticle, function (data) {
            console.log('Update article successfully');
        });
        socketApi.on(socketConfig.receive.article.deleteArticle, function (data) {
            console.log('Delete article successfully');
            
        });
    }
  
    socketDisconnectCallback(payload) {
        this.props.socketActions.socketDisconnected();
        socketApi.remove(socketConfig.receive.article.addArticle);
        socketApi.remove(socketConfig.receive.article.updateArticle);
        socketApi.remove(socketConfig.receive.article.deleteArticle);
    }
  
    socketReconnectAttemptCallback(payload) {
        this.props.socketActions.socketReconnectAttempt();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.articleList != nextProps.articleList) {
            this.setState({ articleList: nextProps.articleList });
        }
    }

    closeDialog() {
        this.setState({ showDiaLog: false, detailItem: {}, editable: null })
    }

    handleMenuClick(eventKey, item) {
        var self = this;
        switch(eventKey) {
            case 'Edit': {
                self.props.articleActions.getOneArticle({ articleId: item._id }).then(data => {
                    if (data.ok) {
                        self.setState({ detailItem: data.res, showDiaLog: true, editable: true });
                    }
                })
                break;
            }
            case 'Add': {
                this.setState({ showDiaLog: true, detailItem: {}, editable: true });
                break;
            }
            case 'Delete': {
                self.props.articleActions.getOneArticle({ articleId: item._id }).then(data => {
                    if (data.ok) {
                        self.setState({ detailItem: data.res, showDiaLog: true, editable: false });
                    }
                })
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
                        <td scope="row">{
                            <Button bsStyle="danger" onClick={(e) => this.handleMenuClick("Delete", item)}>Delete</Button>
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
    const { commonData, auth, socket } = state;
    return {
        user: auth.user,
        articleList: commonData.articleList,
        socket: socket
    }
}

function mapDispatchToProps(dispatch) {
    return {
        articleActions:  bindActionCreators(articleActions, dispatch),
        socketActions: bindActionCreators(socketActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
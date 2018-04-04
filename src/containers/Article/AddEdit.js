import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../actions/articleAction';
import * as notificationActions from '../../actions/notificationActions';
import { socketApi } from '../../utils/socketUtils.js';
import { socketConfig } from '../../constants/socketConfigs';

class AddEdit extends Component {
    constructor() {
        super();
        this.state = {
            detailItem: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.detailItem != nextProps.detailItem) {
            this.setState({ detailItem: nextProps.detailItem })
        }
    }

    handleInputChange(key, e) {
        this.state.detailItem[key] = e.target.value; 
        this.setState({ detailItem: this.state.detailItem });
    }

    saveDialogArticle() {
        let body = {
            title: this.state.detailItem.title,
            content: this.state.detailItem.content,
            userId: this.props.user._id
        }
        // create room
        socketApi.emit(socketConfig.create_room, "room_1");
        if (this.state.detailItem._id) {
            body.articleId = this.state.detailItem._id;
            if (this.props.editable) {
                this.props.notificationActions.updateNotification(body)
                socketApi.emit(socketConfig.send.article.updateArticle, body);
                this.props.articleActions.updateArticle(body).then(data => {
                });
            } else {
                let data = {articleId: body.articleId }
                socketApi.emit(socketConfig.send.article.deleteArticle, data);
                this.props.articleActions.deleteArticle(data).then(data => {
                });
            }
        } else {
            this.props.notificationActions.createNotification(body);
            socketApi.emit(socketConfig.send.article.addArticle, body);
            this.props.articleActions.createArticle(body).then(data => {
                this.props.notificationActions.getAllNotification({userId: this.props.user._id});
            })
        }
        this.props.closeDialog();
    }

    updateArticleList() {
    }

    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.showDiaLog} onHide={() => this.props.closeDialog()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="Title"
                            >
                                <ControlLabel>Title</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.detailItem.title}
                                    placeholder="Enter Title"
                                    onChange={(e) => this.handleInputChange("title", e)}
                                    disabled={this.props.editable}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="content"
                            >
                                <ControlLabel>Content</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.detailItem.content}
                                    placeholder="Enter content"
                                    onChange={(e) => this.handleInputChange("content", e)}
                                    disabled={this.props.editable}
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.props.closeDialog()}>Close</Button>
                        <Button onClick={() => this.saveDialogArticle()} bsStyle="primary">Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { auth, socket } = state;
    return {
        user: auth.user,
        socket: socket
    }
}

function mapDispatchToProps(dispatch) {
    return {
        articleActions: bindActionCreators(articleActions, dispatch),
        notificationActions: bindActionCreators(notificationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import _ from "lodash";
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../actions/articleAction';

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
            content: this.state.detailItem.content
        }
        if (this.state.detailItem._id) {
            body.articleId = this.state.detailItem._id;
            this.props.articleActions.updateArticle(body).then(data => {
                console.log(data);
                // this.updateArticleList();
            });
        } else {
            body.userId = this.props.user._id;
            this.props.articleActions.createArticle(body).then(data => {
                console.log(data);
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
                    </Modal.Body>
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
                            />
                        </FormGroup>
                    </form>
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
    const { auth } = state;
    return {
        user: auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        articleActions: bindActionCreators(articleActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
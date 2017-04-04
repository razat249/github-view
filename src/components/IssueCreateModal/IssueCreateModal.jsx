import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon} from 'react-fa';
import { Button, Modal } from 'react-bootstrap';

class IssueCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false }
  }

  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const modalInstance = (
        <Modal show={this.state.showModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                One fine body...
            </Modal.Body>

            <Modal.Footer>
                <Button>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
            </Modal.Footer>

        </Modal>
    );

    return (
      <div>
        <h1>Pupu</h1>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    repos: state.repos,
  };
}

export default connect(mapStateToProps)(IssueCreateModal);

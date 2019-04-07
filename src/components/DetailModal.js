import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

export default class DetailModal extends Component {
  render() {
    const classModal = this.props.classModal;
    const {
      title,
      books,
      no,
      description,
      grades,
      type
    } = this.props.classSchedule;
    return (
      <Modal isOpen={classModal}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <img src={books} />
            </Col>
            <Col>
              <div>{no}</div>
              <div>{description}</div>
              <div>{grades}</div>
              <div>{type}</div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <button type="button" onClick={this.props.cancelModalHandler}>
            닫기
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  Table,
  ModalFooter,
  ModalHeader,
  Button
} from 'reactstrap';

export default class DetailModal extends Component {
  makeType = function(type) {
    const types = ['전공', '교양'];
    return <td>{types[type]}</td>;
  };

  render() {
    const classModal = this.props.classModal;
    const {
      title,
      books,
      no,
      description,
      grades,
      type,
      professor,
      room
    } = this.props.classSchedule;

    return (
      <Modal isOpen={classModal}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Table>
            <tbody>
              <tr className="detail_row">
                <td className="table_name">과목코드</td>
                <td>
                  <div>{no}</div>
                </td>
              </tr>
              <tr className="detail_row">
                <td className="table_name">담당교수</td>
                <td>
                  <div>{professor}</div>
                </td>
              </tr>
              <tr className="detail_row">
                <td className="table_name">강의실</td>
                <td>
                  <div>{room}</div>
                </td>
              </tr>
              <tr className="detail_row">
                <td className="table_name">교재</td>
                <td>
                  <img alt="이미지가 없습니다." src={books} />
                </td>
              </tr>
              <tr className="detail_row">
                <td className="table_name">설명</td>
                <td>
                  <div>{description}</div>
                </td>
              </tr>
              <tr className="detail_row">
                <td className="table_name">타입</td>
                {this.makeType(type)}
              </tr>
              <tr className="detail_row">
                <td className="table_name">학점</td>
                <td>
                  <div>{grades}</div>
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button tdor="danger" onClick={this.props.cancelModalHandler}>
            닫기
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

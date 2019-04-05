import React, { Component } from 'react';
import List from './List';
import { Row, Col } from 'reactstrap';

export default class ListWrapper extends Component {
  render() {
    const subjects = this.props.subjects;

    let makeList = '';
    if (subjects) {
      makeList = subjects.map((value, index) => {
        return <List value={value} key={index} />;
      });
    }
    return (
      <div className="text-center">
        <Row className="border">
          <Col md="2" xs="12" className="border">
            코드
          </Col>
          <Col md="3" xs="12" className="border">
            과목 이름
          </Col>
          <Col md="2" xs="12" className="border">
            학점
          </Col>

          <Col md="2" xs="12" className="border">
            타입
          </Col>
          <Col md="3" xs="12" className="border">
            상세 / 등록
          </Col>
        </Row>

        {makeList}
      </div>
    );
  }
}

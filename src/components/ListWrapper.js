import React, { Component } from 'react';
import List from './List';
import { Row, Col, Container } from 'reactstrap';

export default class ListWrapper extends Component {
  render() {
    const subjects = this.props.subjects;

    const makeList = subjects.map((value, index) => {
      return <List value={value} key={index} />;
    });

    return (
      <Container className="text-center">
        <Row>
          <Col md="1" xs="12">
            No
          </Col>
          <Col md="3" xs="12">
            과목 이름
          </Col>
          <Col md="1" xs="12">
            학점
          </Col>
          <Col md="3" xs="12">
            시간
          </Col>
          <Col md="1" xs="12">
            타입
          </Col>
          <Col md="1" xs="12">
            상세
          </Col>
          <Col md="1" xs="12">
            등록
          </Col>
        </Row>
        {makeList}
      </Container>
    );
  }
}

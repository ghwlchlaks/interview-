import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';

library.add(faSearch, faCheck);

export default class List extends Component {
  makeTimes = function(times) {
    const days = ['월', '화', '수', '목', '금'];
    return times.map((value, index) => {
      const day = days[parseInt(value[0] / 8)];
      const time = value[0] % 8;
      return (
        <Col key={index}>
          {day}요일 : {time} - {time + 1} 교시
        </Col>
      );
    });
  };

  makeType = function(type) {
    const types = ['전공', '교양'];
    return <span>{types[type]}</span>;
  };

  render() {
    const { no, title, grades, times, type } = this.props.value;

    return (
      <Row>
        <Col md="1" xs="12">
          {no}
        </Col>
        <Col md="3" xs="12">
          {title}
        </Col>
        <Col md="1" xs="12">
          {grades}
        </Col>
        <Col md="3" xs="12">
          {this.makeTimes(times)}
        </Col>
        <Col md="1" xs="12">
          {this.makeType(type)}
        </Col>
        <Col md="1" xs="6">
          <button type="button">
            <FontAwesomeIcon icon="search" />
          </button>
        </Col>
        <Col md="1" xs="6">
          <button type="button">
            <FontAwesomeIcon icon="check" />
          </button>
        </Col>
      </Row>
    );
  }
}

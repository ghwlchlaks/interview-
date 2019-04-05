import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCheck,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';

library.add(faSearch, faCheck, faTimesCircle);

export default class List extends Component {
  makeTimes = function(times) {
    const days = ['월', '화', '수', '목', '금'];
    return times.map((value, index) => {
      const day = days[parseInt(value[0] / 8)];
      const time = value[0] % 8;
      return (
        <span key={index}>
          {day} {time} - {time + 1} 교시, &nbsp;
        </span>
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
      <div>
        <Row>
          <Col md="2" xs="12" className="border">
            {no}
          </Col>
          <Col md="3" xs="12" className="border">
            {title}
          </Col>
          <Col md="2" xs="12" className="border">
            {grades}
          </Col>
          <Col md="2" xs="12" className="border">
            {this.makeType(type)}
          </Col>
          <Col md="3" xs="12" className="border">
            <button type="button">
              <FontAwesomeIcon icon="search" />
            </button>
            <button
              type="button"
              onClick={() =>
                this.props.SaveOrCancleClickHandler(
                  this.props.value,
                  this.props.index,
                  this.props.state
                )
              }
            >
              {this.props.state ? (
                <FontAwesomeIcon icon="check" />
              ) : (
                <FontAwesomeIcon icon="times-circle" />
              )}
            </button>
          </Col>
        </Row>
        <Row className="border">
          <Col md="2">시간</Col>
          <Col>{this.makeTimes(times)}</Col>
        </Row>
      </div>
    );
  }
}

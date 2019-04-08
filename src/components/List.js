import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCheck,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import DetailModal from './DetailModal';

library.add(faSearch, faCheck, faTimesCircle);

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classModal: false,
      classSchedule: {}
    };

    this.detailClickHandler = this.detailClickHandler.bind(this);
    this.cancelModalHandler = this.cancelModalHandler.bind(this);
  }
  makeTimes = function(times) {
    const days = ['월', '화', '수', '목', '금'];
    return times.map((value, index) => {
      const day = days[parseInt(value[0] / 8)];
      const time = value[0] % 8;
      return (
        <span key={index}>
          {day} {time} - {time + 1} 교시 <br />
        </span>
      );
    });
  };

  makeType = function(type) {
    const types = ['전공', '교양'];
    return <span>{types[type]}</span>;
  };

  detailClickHandler() {
    this.setState({
      classModal: true,
      classSchedule: this.props.value
    });
  }

  cancelModalHandler() {
    this.setState({
      classModal: false
    });
  }

  render() {
    const { no, title, grades, times, type, professor } = this.props.value;
    const data = this.props.state ? '상세 / 등록' : '상세 / 제거';

    return (
      <tr>
        <td data-label="코드">{no}</td>
        <td data-label="과목 이름">{title}</td>
        <td data-label="학점">{grades}</td>
        <td data-label="타입">{this.makeType(type)}</td>
        <td data-label="교수">{professor}</td>
        <td data-label="시간">{this.makeTimes(times)}</td>
        <td data-label={data}>
          <button type="button" onClick={this.detailClickHandler}>
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
        </td>

        <DetailModal
          classModal={this.state.classModal}
          classSchedule={this.state.classSchedule}
          cancelModalHandler={this.cancelModalHandler}
        />
      </tr>
    );
  }
}

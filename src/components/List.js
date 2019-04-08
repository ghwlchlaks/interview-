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

    return (
      <tr>
        <td>{no}</td>
        <td>{title}</td>
        <td>{grades}</td>
        <td>{this.makeType(type)}</td>
        <td>{professor}</td>
        <td>{this.makeTimes(times)}</td>
        <td>
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

import React, { Component } from 'react';
import ResultList from './ResultList';
import { Row, Col, Table } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

export default class ResultListWrapper extends Component {
  makeTr(schedules, index) {
    let allData = [];
    for (let i = 0; i < 8; i++) {
      allData.push(
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          {this.makeTd(schedules, i)}
        </tr>
      );
    }

    return allData;
  }

  makeTd(schedules, i) {
    let element = [];
    for (let j = 0; j < 5; j++) {
      let isExist = false;
      let schedule;

      schedules.map((value, index) => {
        let enable_times = value.enable_times;

        for (let q = 0; q < enable_times.length; q++) {
          const time = enable_times[q];
          if (time) {
            let day;
            let _class;

            if (parseInt(time / 8) < time / 8) {
              day = parseInt(time / 8);
              _class = (time % 8) - 1;
            } else {
              day = parseInt(time / 8) - 1;
              _class = 7;
            }

            // console.log('day', day, 'class', _class, 'i', i, 'j', j);
            if (day === j && _class === i) {
              // console.log('day', day, 'class', _class);
              isExist = true;
              schedule = value;
              // enable_times.shift();
            }
          }
        }
      });

      if (isExist) {
        element.push(<ResultList key={j} schedule={schedule} />);
      } else {
        element.push(<td key={j} />);
      }
    }
    return element;
  }

  detailClickHandler() {
    console.log('detail click!');
  }

  render() {
    const schedules = this.props.schedules;

    const makeSchedules = schedules.map((value, index) => {
      return (
        <Col md="3" key={index}>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
              </tr>
            </thead>
            <tbody id={index} ref={this.ref}>
              {this.makeTr(value, index)}
            </tbody>
          </Table>
          <div className="overlay">
            <a
              href="javascript:void(0)"
              onClick={this.detailClickHandler}
              className="icon"
            >
              <FontAwesomeIcon icon="search" />
            </a>
          </div>
        </Col>
      );
    });
    return <Row>{makeSchedules}</Row>;
  }
}

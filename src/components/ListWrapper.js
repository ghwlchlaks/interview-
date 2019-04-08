import React, { Component } from 'react';
import List from './List';
import { Table } from 'reactstrap';

export default class ListWrapper extends Component {
  render() {
    const subjects = this.props.subjects;

    let makeList = '';
    if (subjects) {
      makeList = subjects.map((value, index) => {
        return (
          <List
            value={value}
            key={index}
            index={index}
            SaveOrCancleClickHandler={this.props.SaveOrCancleClickHandler}
            state={this.props.state}
          />
        );
      });
    }
    return (
      <Table className="text-center responsive-table">
        <thead>
          <tr>
            <th>코드</th>
            <th>과목 이름</th>
            <th>학점</th>

            <th>타입</th>
            <th>교수</th>
            <th>시간</th>
            <th>상세 / {this.props.state ? '등록' : '제거'}</th>
          </tr>
        </thead>

        <tbody>{makeList}</tbody>
      </Table>
    );
  }
}

import React, { Component } from 'react';

export default class ResultList extends Component {
  render() {
    const schedule = this.props.schedule;
    const colorArr = [
      '#5e7e9b',
      '#8f784b',
      '#3e91b6',
      '#8977ad',
      '#008080',
      '#20b2aa',
      '#ffff00',
      '#ff4500',
      '#deb887',
      '#2f4f4f'
    ];
    const styles = {
      td: {
        backgroundColor: colorArr[schedule.no % 10]
      }
    };
    // console.log(schedule);
    // const makeSchedule = schedule.map((value, index) => {
    //   return <div key={index} />;
    // });
    // return <div>{makeSchedule}</div>;
    return <td style={styles.td} />;
  }
}

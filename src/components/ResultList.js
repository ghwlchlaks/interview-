import React, { Component } from 'react';

export default class ResultList extends Component {
  render() {
    const { schedule, isModal } = this.props;
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

    if (isModal) {
      return <td style={styles.td}>{schedule.title}</td>;
    } else {
      return <td style={styles.td} />;
    }
  }
}

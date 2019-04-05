import React, { Component } from 'react';
import './Result.css';
import { Redirect } from 'react-router-dom';

export default class Result extends Component {
  printProps(subjects) {
    return subjects.map((value, index) => {
      return <div key={index}>{value.no}</div>;
    });
  }
  render() {
    return (
      <div>
        {!this.props.location.state ? (
          <Redirect to="/" />
        ) : (
          <div>
            {this.printProps(this.props.location.state.selectedSubjects)}
          </div>
        )}
      </div>
    );
  }
}

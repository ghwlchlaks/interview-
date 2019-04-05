import React, { Component } from 'react';
import ListWrapper from '../components/ListWrapper';
import './Home.css';
import { Row, Col, Container, Input } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      selectedSubjects: []
    };

    this.SaveOrCancleClickHandler = this.SaveOrCancleClickHandler.bind(this);
  }

  componentDidMount() {
    axios.get('subjects.json').then(result => {
      if (result.status === 200) {
        this.setState({
          subjects: result.data.subjects
        });
      }
    });
  }

  SaveOrCancleClickHandler(value, index, state) {
    if (state) {
      this.state.subjects.splice(index, 1);
      this.setState({
        subjects: this.state.subjects,
        selectedSubjects: [...this.state.selectedSubjects, value]
      });
    } else {
      this.state.selectedSubjects.splice(index, 1);
      this.setState({
        selectedSubjects: this.state.selectedSubjects,
        subjects: [...this.state.subjects, value]
      });
    }
  }

  makeScheduleClickHandler() {}

  render() {
    const { subjects, selectedSubjects } = this.state;
    return (
      <Container>
        <Row>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="과목 이름을 적어주세요"
          />
        </Row>
        <Row>
          <Col xs="12" md="6">
            <ListWrapper
              subjects={subjects}
              SaveOrCancleClickHandler={this.SaveOrCancleClickHandler}
              state={true}
            />
          </Col>
          <Col xs="12" md="6">
            <ListWrapper
              subjects={selectedSubjects}
              SaveOrCancleClickHandler={this.SaveOrCancleClickHandler}
              state={false}
            />
          </Col>
        </Row>
        <Row>
          <button type="button" onClick={this.makeScheduleClickHandler}>
            시간표 만들기
          </button>
        </Row>
      </Container>
    );
  }
}

export default App;

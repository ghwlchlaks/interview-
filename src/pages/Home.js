import React, { Component } from 'react';
import ListWrapper from '../components/ListWrapper';
import './Home.css';
import { subjects } from '../datas/subjects';
import { Row, Col, Container, Input } from 'reactstrap';

class App extends Component {
  render() {
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
            <ListWrapper subjects={subjects} />
          </Col>
          <Col xs="12" md="6">
            <ListWrapper />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

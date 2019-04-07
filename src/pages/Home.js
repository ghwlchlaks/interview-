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
      selectedSubjects: [],
      items: [],
      type: -1,
      day: -1
    };

    this.SaveOrCancleClickHandler = this.SaveOrCancleClickHandler.bind(this);
    this.makeScheduleClickHandler = this.makeScheduleClickHandler.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.dayChangeHandler = this.dayChangeHandler.bind(this);
  }

  componentDidMount() {
    axios.get('subjects.json').then(result => {
      if (result.status === 200) {
        this.setState({
          subjects: result.data.subjects,
          items: result.data.subjects
        });
      }
    });
  }

  SaveOrCancleClickHandler(value, index, state) {
    if (state) {
      // this.state.subjects.splice(index, 1);
      const deleteItem = this.state.items.splice(index, 1);
      for (let i = 0; i < this.state.subjects.length; i++) {
        if (deleteItem[0].no === this.state.subjects[i].no) {
          this.state.subjects.splice(i, 1);
          break;
        }
      }
      this.setState({
        subjects: this.state.subjects,
        selectedSubjects: [...this.state.selectedSubjects, value],
        items: this.state.items
      });
    } else {
      this.state.selectedSubjects.splice(index, 1);
      this.setState({
        selectedSubjects: this.state.selectedSubjects,
        subjects: [...this.state.subjects, value],
        items: [...this.state.items, value]
      });
    }
  }

  makeScheduleClickHandler() {
    this.props.history.push({
      pathname: '/result',
      state: { selectedSubjects: this.state.selectedSubjects }
    });
  }

  searchChangeHandler(e) {
    let subjects = this.state.subjects;
    subjects = subjects.filter(function(item) {
      return (
        item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ items: subjects });
  }

  typeChangeHandler(e) {
    const type = ['전공', '교양'];
    this.setState({
      type: type.indexOf(e.target.value)
    });
  }

  dayChangeHandler(e) {
    const day = ['월', '화', '수', '목', '금'];
    this.setState({
      day: day.indexOf(e.target.value)
    });
  }

  render() {
    const { subjects, selectedSubjects, items } = this.state;
    return (
      <Container>
        <Row>
          <Col md="6">
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="과목 이름을 적어주세요"
              onChange={this.searchChangeHandler}
            />
          </Col>
          <Col md="3">
            <Input
              type="select"
              name="type"
              id="type"
              onChange={this.typeChangeHandler}
            >
              <option>전체</option>
              <option>전공</option>
              <option>교양</option>
            </Input>
          </Col>
          <Col md="3">
            <Input
              type="select"
              name="day"
              id="day"
              onChange={this.dayChangeHandler}
            >
              <option>전체</option>
              <option>월</option>
              <option>화</option>
              <option>수</option>
              <option>목</option>
              <option>금</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="6">
            <ListWrapper
              subjects={items}
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

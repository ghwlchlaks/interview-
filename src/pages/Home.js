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
      day: -1,
      grade: -1
    };

    this.SaveOrCancleClickHandler = this.SaveOrCancleClickHandler.bind(this);
    this.makeScheduleClickHandler = this.makeScheduleClickHandler.bind(this);
    this.searchChangeHandler = this.searchChangeHandler.bind(this);
    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.dayChangeHandler = this.dayChangeHandler.bind(this);
    this.gradeChangeHandler = this.gradeChangeHandler.bind(this);
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
    const totalGrade = this.getTotalGrade();

    if (totalGrade + value.grades > 21) {
      alert('21학점을 초과하였습니다. 최대 21학점까지 선택 가능합니다.');
      return;
    }

    if (state) {
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

  getTotalGrade() {
    const selectedSubjects = this.state.selectedSubjects;
    let totalGrade = 0;
    selectedSubjects.map(selectedSubject => {
      totalGrade += selectedSubject.grades;
    });

    return totalGrade;
  }

  makeScheduleClickHandler() {
    const totalGrade = this.getTotalGrade();

    if (totalGrade < 18) {
      alert('최소 18학점 이상을 선택하셔야합니다.');
      return;
    }
    this.props.history.push({
      pathname: '/result',
      state: { selectedSubjects: this.state.selectedSubjects }
    });
  }

  searchChangeHandler(e) {
    const title = e.target.value;
    this.setState(
      {
        title: title
      },
      () => {
        this.filterfingHandler();
      }
    );
  }

  typeChangeHandler(e) {
    this.setState(
      {
        type: +e.target.value
      },
      () => {
        this.filterfingHandler();
      }
    );
  }

  filterfingHandler() {
    const title = this.state.title;
    const type = this.state.type;
    const day = this.state.day;
    const grade = this.state.grade;

    let subjects = this.state.subjects;
    subjects = subjects.filter(function(item) {
      let typeCondtion = item.type === type;
      if (type === -1) typeCondtion = true;

      let dayCondition = false;
      if (day === -1) {
        dayCondition = true;
      } else {
        item.times.forEach(time => {
          time.forEach(element => {
            if (parseInt((element - 1) / 8) === day) {
              dayCondition = true;
              return;
            }
            if (dayCondition) return;
          });
        });
      }

      let gradeCondition = item.grades === grade;
      if (grade === -1) gradeCondition = true;

      return (
        item.title.toLowerCase().search(title) !== -1 &&
        typeCondtion &&
        dayCondition &&
        gradeCondition
      );
    });

    this.setState({
      items: subjects
    });
  }

  dayChangeHandler(e) {
    this.setState(
      {
        day: +e.target.value
      },
      () => {
        this.filterfingHandler();
      }
    );
  }

  gradeChangeHandler(e) {
    this.setState(
      {
        grade: +e.target.value
      },
      () => {
        this.filterfingHandler();
      }
    );
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
          <Col md="2">
            <Input
              type="select"
              name="type"
              id="type"
              onChange={this.typeChangeHandler}
            >
              <option value={-1}>전체</option>
              <option value={0}>전공</option>
              <option value={1}>교양</option>
            </Input>
          </Col>
          <Col md="2">
            <Input
              type="select"
              name="day"
              id="day"
              onChange={this.dayChangeHandler}
            >
              <option value={-1}>전체</option>
              <option value={0}>월</option>
              <option value={1}>화</option>
              <option value={2}>수</option>
              <option value={3}>목</option>
              <option value={4}>금</option>
            </Input>
          </Col>
          <Col md="2">
            <Input
              type="select"
              name="grades"
              id="grades"
              onChange={this.gradeChangeHandler}
            >
              <option value={-1}>전체</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
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

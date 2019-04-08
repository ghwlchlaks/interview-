import React, { Component } from 'react';
import './Result.css';
import { Redirect } from 'react-router-dom';
import ResultListWrapper from '../components/ResultListWrapper';
import { Container, Row, Col, Input, Spinner } from 'reactstrap';

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originSchedules: [],
      schedules: [],
      loading: true,
      page: 1
    };

    this.typeChangeHandler = this.typeChangeHandler.bind(this);
    this.paginationClickHandler = this.paginationClickHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.printProps(this.props.location.state.selectedSubjects);
    }
  }

  printProps(subjects) {
    let newArr = [];

    for (let index in subjects) {
      if (subjects[index].grades === 3) {
        subjects[index].times_combination = this.getAllCombinations(
          subjects[index].times,
          2
        );
      } else {
        subjects[index].times_combination = subjects[index].times;
      }
    }

    this.recursive(subjects, [], [], 0, newArr);
    this.setState({
      originSchedules: newArr,
      schedules: newArr,
      loading: false
    });
  }

  getAllCombinations(arr, m) {
    const combinations = [];
    const picked = [];
    const used = [];
    for (let i = 0; i < arr.length; i++) used.push(0);

    function find(picked) {
      if (picked.length === m) {
        let rst = [];
        for (let i of picked) {
          rst = rst.concat(arr[i]);
        }
        combinations.push(rst);
        return;
      } else {
        let start = picked.length ? picked[picked.length - 1] + 1 : 0;
        for (let i = start; i < arr.length; i++) {
          if (i === 0 || arr[i] !== arr[i - 1] || used[i - 1]) {
            picked.push(i);
            used[i] = 1;
            find(picked);
            picked.pop();
            used[i] = 0;
          }
        }
      }
    }
    find(picked);
    return combinations;
  }

  recursive(arr, data, data1, index, newArr) {
    let firsts;
    if (arr[index]) {
      firsts = arr[index].times_combination;
    }

    if (arr.length === index) {
      newArr.push(data);
      return data;
    }

    for (let i in firsts) {
      const b = data1.concat(firsts[i]);
      const a = data.concat({
        ...arr[index],
        enable_times: firsts[i]
      });

      let isDuplicated = false;

      for (let j = 0; j < b.length; j++) {
        for (let q = j + 1; q < b.length; q++) {
          if (b[j] === b[q]) {
            isDuplicated = true;
            break;
          }
        }
      }

      if (!isDuplicated) {
        this.recursive(arr, a, b, index + 1, newArr);
      }
    }
  }

  typeChangeHandler(e) {
    let schedules = this.state.originSchedules;
    const index = +e.target.value;

    if (index === 0) {
      schedules = schedules.filter(schedule => {
        let isExist = [true, true, true, true, true];
        let count = 0;
        schedule.forEach(_class => {
          _class.enable_times.forEach(value => {
            isExist[parseInt((value - 1) / 8)] = false;
          });
        });

        isExist.forEach(value => {
          if (value) count += 1;
        });

        return count > 0;
      });
    } else if (index === 1) {
      schedules = schedules.filter(schedule => {
        let isExist = true;
        schedule.forEach(_class => {
          _class.enable_times.forEach(value => {
            if (value % 8 === 1 || value % 8 === 2 || value % 8 === 3) {
              isExist = false;
              return;
            }
          });
          if (!isExist) return;
        });

        return isExist;
      });
    }

    this.setState({
      schedules: schedules,
      page: 1
    });
  }

  paginationClickHandler(index) {
    this.setState({
      page: index
    });
  }

  render() {
    return (
      <Container>
        {!this.props.location.state ? (
          <Redirect to="/" />
        ) : (
          <div>
            <div className="filter">
              <Row className="filter_area">
                <Col md="12">
                  <h4 className="result_title">시간표를 선택해주세요</h4>
                </Col>
              </Row>
              <Row>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  onChange={this.typeChangeHandler}
                >
                  <option value={-1}>전체</option>
                  <option value={0}>공강 있는 날</option>
                  <option value={1}>오전 수업 X</option>
                </Input>
              </Row>
            </div>
            <div>
              {this.state.loading ? (
                <Spinner color="primary" />
              ) : (
                <div>
                  {!this.state.schedules.length > 0 ? (
                    <div> 결과가 없습니다.</div>
                  ) : (
                    <div>
                      <Row className="page_state_box">
                        <Col
                          md={{ offset: 11 }}
                          xs={{ offset: 10 }}
                          className="page_state"
                        >
                          {this.state.page} / {this.state.schedules.length / 4}
                        </Col>
                      </Row>
                      <Row>
                        <ResultListWrapper
                          schedules={this.state.schedules}
                          page={this.state.page}
                          paginationClickHandler={this.paginationClickHandler}
                        />
                      </Row>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    );
  }
}

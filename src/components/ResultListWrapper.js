import React, { Component } from 'react';
import ResultList from './ResultList';
import {
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DetailModal from './DetailModal';

library.add(faSearch);

export default class ResultListWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      modalSchedule: [],
      classModal: false,
      classSchedule: {}
    };

    this.detailClickHandler = this.detailClickHandler.bind(this);
    this.classClickHandler = this.classClickHandler.bind(this);
    this.cancelModalHandler = this.cancelModalHandler.bind(this);
  }

  makeTr(schedules, isModal) {
    let allData = [];
    for (let i = 0; i < 8; i++) {
      allData.push(
        <tr key={i}>
          <th scope="row">{i + 1}</th>
          {this.makeTd(schedules, i, isModal)}
        </tr>
      );
    }

    return allData;
  }

  makeTd(schedules, i, isModal) {
    let element = [];
    for (let j = 0; j < 5; j++) {
      let isExist = false;
      let schedule;

      schedules.forEach(value => {
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

            if (day === j && _class === i) {
              isExist = true;
              schedule = value;
            }
          }
        }
      });

      if (isExist) {
        element.push(
          <ResultList
            key={j}
            schedule={schedule}
            isModal={isModal}
            classClickHandler={this.classClickHandler}
          />
        );
      } else {
        element.push(<td key={j} />);
      }
    }
    return element;
  }

  classClickHandler(schedule) {
    this.setState({
      classModal: true,
      classSchedule: schedule
    });
  }

  detailClickHandler(schedule, e) {
    this.setState({
      modalSchedule: schedule,
      modal: !this.state.modal
    });
  }

  cancelModalHandler() {
    this.setState({
      classModal: false
    });
  }

  makeSchedules() {
    let data = [];
    const page = this.props.page;
    for (let i = (page - 1) * 4; i < page * 4; i++) {
      data.push(
        <Col md="3" key={i}>
          <Table className="result">
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
            <tbody id={i}>{this.makeTr(this.props.schedules[i], false)}</tbody>
          </Table>
          <div className="overlay">
            <div
              onClick={() => this.detailClickHandler(this.props.schedules[i])}
              className="icon"
            >
              <FontAwesomeIcon icon="search" />
            </div>
          </div>
        </Col>
      );
    }
    return data;
  }

  render() {
    const schedules = this.props.schedules;

    return (
      <Container className="list_box">
        <Row>{this.makeSchedules()}</Row>
        <div className="pagination-wrapper">
          <Pagination aria-label="Page navigation example ">
            <PaginationItem>
              <PaginationLink
                first
                onClick={() => this.props.paginationClickHandler(1)}
              />
            </PaginationItem>
            <PaginationItem disabled={this.props.page <= 1}>
              <PaginationLink
                previous
                onClick={() =>
                  this.props.paginationClickHandler(this.props.page - 1)
                }
              />
            </PaginationItem>
            <PaginationItem disabled={this.props.page >= schedules.length / 4}>
              <PaginationLink
                next
                onClick={() =>
                  this.props.paginationClickHandler(this.props.page + 1)
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                last
                onClick={() =>
                  this.props.paginationClickHandler(schedules.length / 4)
                }
              />
            </PaginationItem>
          </Pagination>
        </div>
        <Modal
          isOpen={this.state.modal}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader>시간표</ModalHeader>
          <ModalBody>
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
              <tbody>{this.makeTr(this.state.modalSchedule, true)}</tbody>
            </Table>
            <DetailModal
              classModal={this.state.classModal}
              classSchedule={this.state.classSchedule}
              cancelModalHandler={this.cancelModalHandler}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={() => this.detailClickHandler([])}>
              닫기
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

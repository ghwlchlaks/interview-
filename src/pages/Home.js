import React, { Component } from 'react';
import ListWrapper from '../components/ListWrapper';
import './Home.css';
import { subjects } from '../datas/subjects';

class App extends Component {
  render() {
    return (
      <div>
        <ListWrapper subjects={subjects} />
      </div>
    );
  }
}

export default App;

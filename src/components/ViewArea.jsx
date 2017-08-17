import React, { Component } from 'react';
import EmployeeList from './EmployeeList.jsx';

class ViewArea extends Component {
  render() {
    return (
      <div style={{margin: '110px 0', zIndex: '0'}}>
        <EmployeeList />
      </div>
    );
  }
}

export default ViewArea;

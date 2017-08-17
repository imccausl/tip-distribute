import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmployeeList from './EmployeeList.jsx';

class ViewArea extends Component {
  render() {
    const viewArea = () => {
      switch (this.props.view.type) {
        case 'EMPLOYEE_LIST':
          return <EmployeeList />;
        case 'USER_PROFILE':
        case 'DISTRIBUTE_TIPS':
        default:
          return null;
      }
    }
    return (
      <div style={{ margin: '110px 0', zIndex: '0' }}>
        {viewArea()}
      </div>
    );
  }
}

export default ViewArea;

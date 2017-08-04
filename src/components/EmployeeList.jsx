import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux';
import EmployeeListItem from './EmployeeListItem.jsx';
import selectEmployee from '../actions/index';
import Employee from './Employee.jsx';
import { showModal } from '../actions/modalActions';


class EmployeeList extends Component {
  renderList() {
    return this.props.employees.map(employee => (
      <EmployeeListItem 
        key={employee.name} 
        name={employee.name} 
        hours={employee.hours} 
        clicked={() => {
          
          this.props.selectEmployee(employee);
          this.props.showModal();
        }}
      />
    ),
    );
  }

  render() {
    return (
      <div>
      <List>
        <Subheader>Employees Involved in This Tip Out</Subheader>
        {this.renderList()}
      </List>
      <Employee open={this.props.open} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    employees: state.employees,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

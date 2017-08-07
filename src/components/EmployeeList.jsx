import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { bindActionCreators } from 'redux';
import EmployeeListItem from './EmployeeListItem.jsx';
import selectEmployee from '../actions/index';
import Employee from './Employee.jsx';
import AddPeople from './AddPeople.jsx';
import { showModal } from '../actions/modalActions';


class EmployeeList extends Component {
  renderList() {
    return this.props.tipOut.employees.map(employee => (
      <EmployeeListItem 
        key={employee.id} 
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
   
    if (!this.props.tipOut) return null;
        
    return (
      <div>
      <List>
        {this.renderList()}
      </List>
      <Employee open={this.props.open} />
      <AddPeople open={this.props.showDialog} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOut: state.activeTipOut,
    showDialog: state.toggleAddPeopleDialog,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

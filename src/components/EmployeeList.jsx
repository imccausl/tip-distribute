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
    console.log(this.props.tipOut.employees); 
    return this.props.tipOut.employees.map(employee => (
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
   
    console.log(this.props.tipOut);
    if (!this.props.tipOut) return null;    
        
    return (
      <div>
      <List>
        <Subheader>Tipout Week Ending: [WeekEnding]</Subheader>
        {this.renderList()}
      </List>
      <Employee open={this.props.open} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOut: state.tipOut,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

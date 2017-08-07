import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/index';
import SinglePerson from './SinglePerson.jsx';
import { showModal } from '../actions/modalActions';
import addNewPerson from '../actions/addNewPersonToCurrentTipOut';

class EmployeeList extends Component {
  renderList() {
    return this.props.tipOut.employees.map(employee => (
      <SinglePerson
        key={employee.id}
        name={employee.name}
        hours={employee.hours}
      />
    ),
    );
  }

  render() {
    if (!this.props.tipOut) return null;
    
    console.log(this.props.tipOut);

    return (
      <div>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOut: state.activeTipOut,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, showModal, addNewPerson }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

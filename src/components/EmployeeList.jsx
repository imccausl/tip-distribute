import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/selectPerson';
import SinglePerson from './SinglePerson.jsx';
import { showModal } from '../actions/modalActions';
import selectPeople from '../actions/selectEmployees';

class EmployeeList extends Component {
  renderList() {
    console.log("people", this.props.people);

    return this.props.people.map(employee => (
      <SinglePerson
        key={employee.id}
        id={employee.id}
        //person={employee}
        personName={employee.name}
        hours={employee.hours}
      />
    ),
    );
  }

  render() {
    if (!this.props.people) return null;

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
    people: state.activePeople,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, showModal, selectPeople }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

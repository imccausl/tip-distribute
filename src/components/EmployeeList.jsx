import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/selectPerson';
import SinglePerson from './SinglePerson.jsx';
import selectPeople from '../actions/selectEmployees';

class EmployeeList extends Component {
  renderList() {
    return this.props.tipOut.employees.map(employee => (
      <SinglePerson
        key={employee.id}
        id={employee.id}
        name={employee.name}
        hours={employee.hours}
      />
    ),
    );
  }

  render() {
    if (!this.props.tipOut) return null;

    return (
      <div style={{marginTop: '60px', zIndex: '0'}}>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOut: state.currentTipOut,
    people: state.activePeople,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, selectPeople }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

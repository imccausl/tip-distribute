import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/selectPerson';
import SinglePerson from './SinglePerson.jsx';
import { showModal } from '../actions/modalActions';
import addNewPerson from '../actions/addNewPersonToCurrentTipOut';

class EmployeeList extends Component {
  makeNewId() {
      const tempId = new Date();
      const parsedDate = Date.parse(tempId);

      // prevent unique key errors if button is clicked more than once a second
      const randomizer = Math.floor(Math.random() * parsedDate);
      return parsedDate + randomizer;
    }
    
  renderList() {
    return this.props.tipOut.employees.map(employee => (
      <SinglePerson
        addPersonClicked={() => this.props.addNewPerson({ 
            id: this.makeNewId(), name: 'New Person', hours: '0' })}
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

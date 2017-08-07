import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/index';
import SinglePerson from './SinglePerson.jsx';
import { showModal } from '../actions/modalActions';
import { showAddPeopleDialog } from '../actions/toggleAddPeopleDialog';


class EmployeeList extends Component {
  constructor(props) {
    super(props);

    let tempId = 0;
    const newPeople = [{ id: tempId += 1, name: '', hours: 0 }];
    this.state = { newPeople };
    this.addPeopleHandler = this.addPeopleHandler.bind(this);
  }

  addPeopleHandler(tempId) {
    const parsedDate = Date.parse(tempId);
    // prevent unique key errors if button is clicked more than once a second
    const randomizer = Math.floor(Math.random() * parsedDate);
    const id = parsedDate + randomizer;

    const newElement = this.state.newPeople.concat({ id, name: '', hours: 0 });

    this.setState({ newPeople: newElement });
  }

  renderList() {
    const tempId = new Date();

    return this.props.tipOut.employees.map(employee => (
      <SinglePerson
        addPerson={() => this.addPeopleHandler(tempId)}
        key={employee.id}
        name={employee.name}
        hours={employee.hours}
      />
    ),
    );
  }

  render() {
    if (!this.props.tipOut) return null;

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
    showDialog: state.toggleAddPeopleDialog,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, showModal, showAddPeopleDialog }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

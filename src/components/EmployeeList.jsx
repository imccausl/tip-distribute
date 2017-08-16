import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/selectPerson';
import SinglePerson from './SinglePerson.jsx';
import selectPeople from '../actions/selectEmployees';

class EmployeeList extends Component {
  renderList() {
    return this.props.tipOut.employees.map(employee => (
      <ListItem
        key={employee.id}
        disabled={true}
        style={{ paddingTop: '0', paddingBottom: '0' }}
      >
        <SinglePerson
          id={employee.id}
          name={employee.name}
          hours={employee.hours}
        />
      </ListItem>
    ),
    );
  }

  render() {
    if (!this.props.tipOut) return null;

    return (
      <div style={{margin: '60px 0', zIndex: '0'}}>
        <List>
          {this.renderList()}
        </List>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/selectPerson';
import SinglePerson from './SinglePerson.jsx';
import TipOutToolbar from './TipOutToolbar.jsx';
import selectPeople from '../actions/selectEmployees';

class EmployeeList extends Component {
  renderList() {
    const { people } = this.props.tipOut;

    return Object.keys(people).map(key => (
      <ListItem
        key={key}
        disabled={true}
        style={{ paddingTop: '0', paddingBottom: '0' }}
      >
        <SinglePerson
          id={people[key].id}
          name={people[key].name}
          hours={people[key].hours}
        />
      </ListItem>
    ),
    );
  }

  render() {
    if (!this.props.tipOut) return null;

    return (
      <div>
        <TipOutToolbar />
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

import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import selectEmployee from '../actions/selectPerson';
import SinglePerson from './SinglePerson.jsx';
import TipOutToolbar from './TipOutToolbar.jsx';
import selectPeople from '../actions/selectEmployees';
import { getPeopleFromStore, sortByLastName } from '../helpers/currentTipOutHelpers';

@firebaseConnect(['/tipOuts'])
class EmployeeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tipOut: this.props.tipOut,
      stores: this.props.stores,
      allPeople: this.props.allPeople,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      tipOut: newProps.tipOut,
      stores: newProps.stores,
      allPeople: newProps.allPeople,
    });
  }

  renderList() {
    const { people } = this.state.tipOut;
    const sortedPeople = sortByLastName(people);

    return Object.keys(sortedPeople).map(key => (
      <ListItem
        key={key}
        disabled={true}
        style={{ paddingTop: '0', paddingBottom: '0' }}
      >
        <SinglePerson
          id={sortedPeople[key].id}
          name={sortedPeople[key].name}
          hours={sortedPeople[key].hours}
          peopleList={getPeopleFromStore(this.state.tipOut.storeRef, this.state.stores, this.state.allPeople)}
          personRef={key}
        />
      </ListItem>
    ),
    );
  }

  render() {
    if (!this.state.tipOut) return null;

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
    stores: state.firebase.data.stores,
    tipOuts: state.firebase.data.tipOuts,
    allPeople: state.firebase.data.people,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectEmployee, selectPeople }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

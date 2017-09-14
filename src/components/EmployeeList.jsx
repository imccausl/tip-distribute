import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SinglePerson from './SinglePerson.jsx';
import TipOutToolbar from './TipOutToolbar.jsx';
import selectPeople from '../actions/selectEmployees';
import { getPeopleFromStore, sortByLastName } from '../helpers/currentTipOutHelpers';

export default class EmployeeList extends Component {
  renderList() {
    const { viewModel, people, stores } = this.props;
    const tipOutPeople = viewModel.people;
    const sortedPeople = sortByLastName(tipOutPeople);
    
    return Object.keys(sortedPeople).map(key => {
      const nameKey = sortedPeople[key].id;
      const name = people[nameKey].displayName;

      if (!sortedPeople[key]) {
        return null;
      }

      return (
      
      <ListItem
        key={key}
        disabled={true}
        style={{ paddingTop: '0', paddingBottom: '0' }}
      >
        <SinglePerson
          id={sortedPeople[key].id}
          belongsTo={viewModel.id}
          name={name}
          hours={sortedPeople[key].hours}
          storePeopleList={getPeopleFromStore(viewModel.storeRef, stores, people)}
          allPeople={people}
          storeRef={viewModel.storeRef}
          personRef={key}
        />
      </ListItem>
    )
  })
  }

  render() {
    const { viewModel } = this.props;
    if (!viewModel) return null;

    return (
      <div>
        <TipOutToolbar viewModel={viewModel}/>
        <List>
          {this.renderList()}
        </List>
      </div>
    );
  }
}

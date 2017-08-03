import React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import EmployeeListItem from './EmployeeListItem.jsx';

const EmployeeList = () => (
  <List>
    <Subheader>Employees Involved in This Tip Out</Subheader>
    <EmployeeListItem />
    <EmployeeListItem />
    <EmployeeListItem />
    <EmployeeListItem />
    <EmployeeListItem />
    <EmployeeListItem />
    <EmployeeListItem />
  </List>
);

export default EmployeeList;

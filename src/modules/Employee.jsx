/* Employee.jsx
 * Allow editing of Employee name and Hours Worked for tip out calculation
 */
import React, { Component } from 'react';
import Card, { CardActions, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const Employee = () => (
  <Card>
    <CardTitle
      title="Employee Profile"
    />
    <CardText>
      <TextField
        floatingLabelText="Employee Name"
      />
      <TextField
        floatingLabelText="Tippable Hours Worked"
      />
    </CardText>
    <CardActions>
      <RaisedButton
        label="Cancel"
      />
      <RaisedButton
        label="Save"
        primary={true}
      />
    </CardActions>
  </Card>
)

export default Employee;

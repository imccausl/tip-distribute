import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class EmployeeListItem extends Component {
  render() {
    return (
      <Paper>
        <TextField
          floatingLabelText="Person Name"
          defaultValue={this.props.name}
        />
        <TextField
          floatingLabelText="Tippable Hours Worked"
          defaultValue={this.props.hours}
        />
      </Paper>
    );
  }
}

export default EmployeeListItem;

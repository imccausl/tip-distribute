import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class EmployeeListItem extends Component {
  render() {
    const style = {
      padding: '0 10px',
      margin: '5px 0',
    };

    return (
      <Paper style={style} zDepth={2}>
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

import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

class SinglePerson extends Component {
  render() {
    const style = {
      padding: '0 10px',
    };

    return (
      <Paper style={style} zDepth={2}>
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          defaultValue="Enter a Name"
        />
        <TextField
          hintText="Tippable Hours Worked"
          floatingLabelText="Tipable Hours Worked"
          defaultValue="Hours Worked"
        />
        <IconButton tooltip="Remove this person">
          <SvgIcon><ContentRemove /></SvgIcon>
        </IconButton>
        <IconButton tooltip="Add another person">
          <SvgIcon><ContentAdd /></SvgIcon>
        </IconButton>
      </Paper>
    );
  }
}

export default SinglePerson;

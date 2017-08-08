import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentAdd from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';

class SinglePerson extends Component {
  render() {
    const style = {
      padding: '0 10px',
      margin: '5px 0',
    };

    return (
      <Paper style={style} zDepth={2}>
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          defaultValue={this.props.name}
        />
        <TextField
          hintText="Hours Worked"
          floatingLabelText="Hours Worked"
          defaultValue={this.props.hours}
        />
        <IconButton tooltip="Remove this person">
          <SvgIcon><ContentRemove /></SvgIcon>
        </IconButton>
        <IconButton
          tooltip="Add new person to tip out"
          onTouchTap={this.props.addPersonClicked}
        >
          <SvgIcon><ContentAdd /></SvgIcon>
        </IconButton>
      </Paper>
    );
  }
}

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePerson);

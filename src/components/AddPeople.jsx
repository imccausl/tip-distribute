import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SinglePerson from './SinglePerson.jsx';
import { hideAddPeopleDialog } from '../actions/toggleAddPeopleDialog';

class AddPeople extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={ () => this.props.hideAddPeopleDialog() }
      />,
      <FlatButton
        primary={true}
        keyboardFocused={true}
        label="Add People"
      />,
    ];

    return (
      <Dialog
        title="Add People To Tip Out"
        actions={actions}
        open={this.props.open}
      >
        <SinglePerson />
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.toggleAddPeopleDialog,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideAddPeopleDialog }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPeople);

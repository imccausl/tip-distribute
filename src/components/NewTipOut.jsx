import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { hideNewTipOutDialog } from '../actions/newTipOutDialogActions';

class NewTipOut extends Component {
  disableWeekdays(date) {
    return date.getDay() !== 0 || date.getDay() >= 5;
  }

  getNearestWeekEnding() {
    const today = new Date();
    const todaysDay = today.getDay();
    const todaysDate = today.getDate();

    return new Date(today.getFullYear(), today.getMonth(), todaysDate - todaysDay);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={()=>this.props.hideNewTipOutDialog()}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
      />,
    ];
    return (
      <Dialog
        title="New Tip Out"
        actions={actions}
        autoScrollBodyContent={true}
        open={this.props.isOpen}
        onRequestClose={()=>this.props.hideNewTipOutDialog()}
      >
        <DatePicker
          hintText="Week Ending"
          floatingLabelText="Tip Out Week Ending"
          shouldDisableDate={this.disableWeekdays}
          defaultDate={this.getNearestWeekEnding()}
        />
        <TextField
          floatingLabelText="Cash Amount to Distribute"
        />
        <Divider />

      </Dialog>
    );
  }
}

function mapPropsToState(state) {
  return {
    isOpen: state.showTipOutDialog,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideNewTipOutDialog }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(NewTipOut);


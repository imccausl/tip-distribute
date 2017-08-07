import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { hideNewTipOutDialog } from '../actions/newTipOutDialogActions';
import addNewTipOut from '../actions/addNewTipOut';

class NewTipOut extends Component {
  constructor(props) {
    super(props);
    this.state = { newDate: null, newTotalCash: 0 }
  }

  getNearestWeekEnding() {
    const today = new Date();
    const todaysDay = today.getDay();
    const todaysDate = today.getDate();

    return new Date(today.getFullYear(), today.getMonth(), todaysDate - todaysDay);
  }

  disableWeekdays(date) {
    return date.getDay() !== 0 || date.getDay() >= 5;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={() => this.props.hideNewTipOutDialog()}
      />,
      <FlatButton
        label="Create"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.props.addNewTipOut(
            {
              weekEnding: this.state.newDate,
              totalCash: this.state.newTotalCash,
            });

          this.props.hideNewTipOutDialog();
        }}
      />,
    ];
    return (
      <Dialog
        title="New Tip Out"
        actions={actions}
        autoScrollBodyContent={true}
        open={this.props.isOpen}
        onRequestClose={() => this.props.hideNewTipOutDialog()}
      >
        <DatePicker
          hintText="Week Ending"
          floatingLabelText="Tip Out Week Ending"
          shouldDisableDate={this.disableWeekdays}
          defaultDate={this.getNearestWeekEnding()}
          onChange={(event, newValue) => {
            const months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ];

            const tipOutDate = months[newValue.getMonth()] + " " + newValue.getDate();

            this.setState({ newDate: tipOutDate });
          }}
        />
        <TextField
          floatingLabelText="Cash Amount to Distribute"
          onChange={(event, newValue) => this.setState({ newTotalCash: newValue })}
        />
      </Dialog>
    );
  }
}

function mapPropsToState(state) {
  return {
    isOpen: state.showTipOutDialog,
    tipOuts: state.tipOuts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideNewTipOutDialog, addNewTipOut }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(NewTipOut);


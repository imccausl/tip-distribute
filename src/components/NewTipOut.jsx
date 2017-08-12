import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import addNewTipOut from '../actions/addNewTipOut';
import addNewPerson from '../actions/addNewPersonToCurrentTipOut';
import selectPeople from '../actions/selectEmployees';
import makeNewId from '../helpers/makeNewId';
import updateTipOuts from '../actions/updateTipOuts';
import showModal from '../actions/modalActions';

const defaults = true;

class NewTipOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newDate: this.parseDate(this.getNearestWeekEnding()),
      newTotalCash: '0',
    };

    this.getNearestWeekEnding = this.getNearestWeekEnding.bind(this);
    this.disableWeekdays = this.disableWeekdays.bind(this);
    this.parseDate = this.parseDate.bind(this);
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

  parseDate(date) {
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

    const tipOutMonth = months[date.getMonth()];
    return tipOutMonth.concat(' ', date.getDate());
  }

  render() {
    if ((!this.props.modalAction)) {
      return null;
    } else if (this.props.modalAction.modal === 'ADD_NEW_TIP_OUT') {
      const actions = [
        <FlatButton
          label="Cancel"
          onTouchTap={() => this.props.showModal('ADD_NEW_TIP_OUT', false)}
        />,
        <FlatButton
          label="Create"
          primary={defaults}
          keyboardFocused={defaults.keyboardFocused}
          onTouchTap={() => {
            const tipOutId = makeNewId();
            const newPerson = {
              belongsTo: tipOutId,
              id: makeNewId(),
              name: 'New Person',
              hours: '0',
            };

            this.props.addNewTipOut(
              {
                id: tipOutId,
                weekEnding: this.state.newDate,
                totalCash: this.state.newTotalCash,
              });

            this.props.addNewPerson(newPerson);
            this.props.showModal('ADD_NEW_TIP_OUT', false);
          }}
        />,
      ];

      return (
        <Dialog
          title="New Tip Out"
          actions={actions}
          autoScrollBodyContent={defaults}
          open={this.props.modalAction.isOpen}
          onRequestClose={() => this.props.showModal('ADD_NEW_TIP_OUT', false)}
        >
          <DatePicker
            autoOk={defaults}
            hintText="Week Ending"
            floatingLabelText="Tip Out Week Ending"
            shouldDisableDate={this.disableWeekdays}
            defaultDate={this.getNearestWeekEnding()}
            onChange={(event, newValue) => {
              this.setState({ newDate: this.parseDate(newValue) });
            }}
          />
          <TextField
            floatingLabelText="Cash Amount to Distribute"
            defaultValue={this.state.newTotalCash}
            onChange={(event, newValue) => this.setState({ newTotalCash: newValue })}
          />
        </Dialog>
      );
    }
    return null;
  }
}

NewTipOut.propTypes = {
  showModal: PropTypes.func.isRequired,
  addNewTipOut: PropTypes.func.isRequired,
  addNewPerson: PropTypes.func.isRequired,
};

function mapPropsToState(state) {
  return {
    tipOuts: state.tipOuts,
    modalAction: state.modalAction,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showModal,
    addNewTipOut,
    addNewPerson,
  }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(NewTipOut);


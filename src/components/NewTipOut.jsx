import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import addNewTipOut from '../actions/addNewTipOut';
import makeNewId from '../helpers/makeNewId';
import showModal from '../actions/modalActions';
import editTipOut from '../actions/editTipOut';

const defaults = true;

class NewTipOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newDate: this.parseDate(this.getNearestWeekEnding()),
      newExactDate: (!this.props.currentTipOut) ? this.getNearestWeekEnding() : this.props.currentTipOut.exactDate,
      newTotalCash: (!this.props.currentTipOut) ? '200' : this.props.currentTipOut.totalCash,
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
    let modalButton = null;
    let modalTitle = '';
    let defaultDate = '';
    let defaultCash = '';

    const cancelButton = [(<FlatButton
      label="Cancel"
      onTouchTap={() => this.props.showModal('', false)}
    />),];

    if ((!this.props.modalAction)) {
      return null;
    } else { 
      if (this.props.modalAction.modal === 'ADD_NEW_TIP_OUT') {
        modalTitle = 'New Tip Out';
        defaultDate = this.getNearestWeekEnding();
        defaultCash = '200';

      modalButton = (
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
                exactDate: this.state.newExactDate,
                weekEnding: this.state.newDate,
                totalCash: this.state.newTotalCash,
                employees: newPerson,
              });

            this.props.showModal('', false);
          }}
        />);
      } else if (this.props.modalAction.modal === 'EDIT_TIP_OUT_MODAL') {  
        modalTitle = 'Edit Tip Out';
        defaultDate = this.props.currentTipOut.exactDate;
        defaultCash = this.props.currentTipOut.totalCash;

        modalButton = (
          <FlatButton
            label="Change"
            primary={defaults}
            keyboardFocused={defaults.keyboardFocused}
            onTouchTap={() => {
              this.props.editTipOut( this.props.currentTipOut.id, 
                {
                  exactDate: this.state.newExactDate,
                  weekEnding: this.state.newDate,
                  totalCash: this.state.newTotalCash,
                });

              this.props.showModal('', false);
            }}
          />);
      }

      const actions = cancelButton.concat(modalButton);

      return (
        <Dialog
          title={modalTitle}
          actions={actions}
          autoScrollBodyContent={defaults}
          open={this.props.modalAction.isOpen}
          onRequestClose={() => this.props.showModal('', false)}
        >
          <DatePicker
            autoOk={defaults}
            hintText="Week Ending"
            floatingLabelText="Tip Out Week Ending"
            shouldDisableDate={this.disableWeekdays}
            defaultDate={defaultDate}
            onChange={(event, newValue) => {
              this.setState({ newDate: this.parseDate(newValue), newExactDate: newValue });
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
  }
}

NewTipOut.propTypes = {
  showModal: PropTypes.func.isRequired,
  addNewTipOut: PropTypes.func.isRequired,
};

function mapPropsToState(state) {
  return {
    data: state.dataTree,
    tipOutsById: state.tipOutsById,
    currentTipOut: state.currentTipOut,
    modalAction: state.modalAction,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showModal,
    addNewTipOut,
    editTipOut,
  }, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(NewTipOut);


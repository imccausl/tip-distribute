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
  static disableWeekdays(date) {
    return date.getDay() !== 0 || date.getDay() >= 5;
  }

  static getNearestWeekEnding() {
    const today = new Date();
    const todaysDay = today.getDay();
    const todaysDate = today.getDate();

    return new Date(today.getFullYear(), today.getMonth(), todaysDate - todaysDay);
  }

  static parseDate(date) {
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

  constructor(props) {
    super(props);

    this.state = {
      newDate: NewTipOut.parseDate(NewTipOut.getNearestWeekEnding()),
      newExactDate: (!this.props.currentTipOut) ?
        NewTipOut.getNearestWeekEnding() : this.props.currentTipOut.exactDate,
      newTotalCash: (!this.props.currentTipOut) ? '200' : this.props.currentTipOut.totalCash,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ newTotalCash: (!nextProps.currentTipOut) ? '200' : nextProps.currentTipOut.totalCash });
  }

  render() {
    let modalButton = null;
    let defaultDate = '';
    const disabledButton = !(this.props.data[0]);
    const cancelButton = [(<FlatButton
      label="Cancel"
      disabled={disabledButton}
      onTouchTap={() => this.props.showModal('', false)}
    />)];

    if ((!this.props.modalAction)) {
      return null;
    }

    if (this.props.modalAction.modal === 'ADD_NEW_TIP_OUT') {
      defaultDate = NewTipOut.getNearestWeekEnding();

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
              name: '',
              hours: '',
            };

            this.props.addNewTipOut(
              {
                id: tipOutId,
                exactDate: this.state.newExactDate,
                weekEnding: this.state.newDate,
                totalCash: this.state.newTotalCash,
                employees: newPerson,
              });

            this.props.showModal(false);
          }}
        />);
    } else if (this.props.modalAction.modal === 'EDIT_TIP_OUT_MODAL') {  
      defaultDate = this.props.currentTipOut.exactDate;

      modalButton = (
        <FlatButton
          label="Change"
          primary={defaults}
          keyboardFocused={defaults.keyboardFocused}
          onTouchTap={() => {
            this.props.editTipOut(this.props.currentTipOut.id,
              {
                exactDate: this.state.newExactDate,
                weekEnding: this.state.newDate,
                totalCash: this.state.newTotalCash,
              });

            this.props.showModal(false);
          }}
        />);
    }

    if (this.props.modalAction.modal === 'EDIT_TIP_OUT_MODAL' || this.props.modalAction.modal === 'ADD_NEW_TIP_OUT') {
      const actions = cancelButton.concat(modalButton);

      return (
        <Dialog
          title={this.props.modalAction.title}
          actions={actions}
          autoScrollBodyContent={defaults}
          open={this.props.modalAction.isOpen}
        >
          <DatePicker
            autoOk={defaults}
            hintText="Week Ending"
            floatingLabelText="Tip Out Week Ending"
            shouldDisableDate={NewTipOut.disableWeekdays}
            defaultDate={new Date(defaultDate)}
            onChange={(event, newValue) => {
              this.setState({ newDate: NewTipOut.parseDate(newValue), newExactDate: newValue });
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
  editTipOut: PropTypes.func.isRequired,
  modalAction: PropTypes.object,
  currentTipOut: PropTypes.object,
};

NewTipOut.defaultProps = {
  modalAction: false,
  currentTipOut: null,
};

PropTypes.checkPropTypes(NewTipOut.propTypes, NewTipOut.props, 'prop', NewTipOut);

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


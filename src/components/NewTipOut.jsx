import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import addNewTipOut from '../actions/addNewTipOut';
import makeNewId from '../helpers/makeNewId';
import showModal from '../actions/modalActions';
import editTipOut from '../actions/editTipOut';

const defaults = true;

function mapPropsToState(state) {
  return {
    tipOuts: state.tipOuts,
    authId: state.firebase.auth.uid,
    currentTipOut: state.currentTipOut,
    stores: state.firebase.data.stores,
    profile: state.firebase.profile,
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

@firebaseConnect(['/tipOuts'])
@connect(mapPropsToState, mapDispatchToProps)
export default class NewTipOut extends Component {
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
      newWeekEnding: (!this.props.currentTipOut) ?
        NewTipOut.getNearestWeekEnding() : this.props.currentTipOut.weekEnding,
      newTotalCash: (!this.props.currentTipOut) ? '200' : this.props.currentTipOut.totalCash,
      newStore: '1s',
    };

    this.handleStoreSelectorChange = this.handleStoreSelectorChange.bind(this);
    this.populateStoreMenu = this.populateStoreMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ newTotalCash: (!nextProps.currentTipOut) ? '200' : nextProps.currentTipOut.totalCash });
  }

  populateStoreMenu() {
    const { stores } = this.props;

    return Object.keys(stores)
      .map(key => (
        <MenuItem
          key={key}
          value={key}
          primaryText={stores[key].store}
          people={stores[key].people}
        />
      ));
  }

  handleStoreSelectorChange(e, i, v) {
    this.setState({ newStore: v });
  }

  render() {
    let modalButton = null;
    let defaultDate = '';
    const disabledButton = !(this.props.data);
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
            // HANDEL CREATE NEW TIP OUT
            // TODO: move into its own function.
            const { tipOutsCreated } = this.props.profile;
            console.log(tipOutsCreated);
            const newTipOutPeople = this.props.stores[this.state.newStore].people;
            const tipOutId = makeNewId();
            let storePeople = {};
            
            newTipOutPeople.forEach(person => {
              storePeople = {
                ...storePeople,
                [makeNewId()]: {
                  belongsTo: tipOutId,
                  id: person,
                  hours: '',
                }
              }
            });
            
            console.log(this.state.newDate);
            this.props.firebase.push( '/tipOuts',
              {
                createdBy: this.props.authId,
                timestamp: Date.now(),
                ref: tipOutId,
                weekEnding: this.state.newDate,
                hourlyWage: 0,
                totalHours: 0,
                totalCash: this.state.newTotalCash,
                store: this.state.newStore,
                people: storePeople,
              })
              .then(snapshot => {
                console.log(snapshot.key);
                let newTipOutsCreated = [];

                if (tipOutsCreated) {
                  newTipOutsCreated = Object.assign([], tipOutsCreated);
                }

                newTipOutsCreated.push(snapshot.key);
                console.log(newTipOutsCreated);
                this.props.firebase.updateProfile({ tipOutsCreated: newTipOutsCreated })
              });

            this.props.showModal(false);
          }}
        />);
    } else if (this.props.modalAction.modal === 'EDIT_TIP_OUT_MODAL') {
      defaultDate = this.props.currentTipOut.weekEnding;

      modalButton = (
        <FlatButton
          label="Change"
          primary={defaults}
          keyboardFocused={defaults.keyboardFocused}
          onTouchTap={() => {
            this.props.editTipOut(this.props.currentTipOut.id,
              {
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
          {/* Choosing store for admins only? */}
          <SelectField
            floatingLabelText="Store"
            value={this.state.newStore}
            onChange={this.handleStoreSelectorChange}
          >
            {this.populateStoreMenu()}
          </SelectField>
          <DatePicker
            autoOk={defaults}
            hintText="Week Ending"
            floatingLabelText="Tip Out Week Ending"
            shouldDisableDate={NewTipOut.disableWeekdays}
            defaultDate={new Date(defaultDate)}
            onChange={(event, newValue) => {
              this.setState({ newDate: NewTipOut.parseDate(newValue), newWeekEnding: newValue });
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


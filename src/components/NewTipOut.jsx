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
import tipOutShape from '../models/tipOut.model';

const defaults = true;

function mapPropsToState(state) {
  return {
    tipOuts: state.tipOuts,
    authId: state.firebase.auth.uid,
    fbTipOuts: state.firebase.data.tipOuts,
    currentTipOut: state.currentTipOut,
    stores: state.firebase.data.stores,
    profile: state.firebase.profile,
    people: state.firebase.data.people,
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

@firebaseConnect(['/tipOuts', '/people'])
@connect(mapPropsToState, mapDispatchToProps)
export default class NewTipOut extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    addNewTipOut: PropTypes.func.isRequired,
    editTipOut: PropTypes.func.isRequired,
    modalAction: PropTypes.shape({
      modal: PropTypes.string,
      title: PropTypes.title,
      isOpen: PropTypes.boolean,
    }),
    currentTipOut: PropTypes.shape(tipOutShape),
  };

  static defaultProps = {
    modalAction: false,
    currentTipOut: null,
  };

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
      newDate: NewTipOut.getNearestWeekEnding(),
      newWeekEnding: (!this.props.currentTipOut) ?
        NewTipOut.getNearestWeekEnding() : this.props.currentTipOut.weekEnding,
      newTotalCash: (!this.props.currentTipOut) ? '200' : this.props.currentTipOut.totalCash,
      newStore: '',
    };

    this.handleStoreSelectorChange = this.handleStoreSelectorChange.bind(this);
    this.populateStoreMenu = this.populateStoreMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newTotalCash: (!nextProps.currentTipOut) ? '200' : nextProps.currentTipOut.totalCash,
      newStore: (!nextProps.people) ? '' : nextProps.people[nextProps.profile.ref].storeRef,
    });
  }

  populateStoreMenu() {
    const { stores } = this.props;

    return Object.keys(stores)
      .map(key => (
        <MenuItem
          key={key}
          value={key}
          primaryText={stores[key].storeNum}
        />
      ));
  }

  handleStoreSelectorChange(e, i, v) {
    this.setState({ newStore: v });
  }

  render() {
    let modalButton = null;
    let defaultDate = '';
    const disabledButton = !(this.props.fbTipOuts);
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
            // HANDLE CREATE NEW TIP OUT
            // TODO: move into its own function.
            // TODO: add record to people/store/person/belongsTo
            const newTipOutPeople = this.props.stores[this.state.newStore].people;
            const tipOutId = makeNewId();
            let storePeople = {};
            
            newTipOutPeople.forEach((person) => {
              const personBelongsToRecord = this.props.people[person].belongsTo;
              const newBelongsToRecord = personBelongsToRecord.concat({ id: tipOutId, pickedUp: false, isPending: true });

              storePeople = {
                ...storePeople,
                [makeNewId()]: {
                  belongsTo: tipOutId,
                  id: person,
                  hours: '',
                },
              };

              // create record for each person now belonging to tip out
              console.log("Adding record:", newBelongsToRecord);
              this.props.firebase.set(`/people/${person}/belongsTo`, newBelongsToRecord);
            });

            const newTipOut = {
              [tipOutId]: {
                weekEnding: Date.parse(this.state.newDate),
                hourlyWage: 0,
                totalHours: 0,
                totalCash: this.state.newTotalCash,
                storeRef: this.state.newStore,
                id: tipOutId,
                people: storePeople,
              }
            }
            
            this.props.firebase.update( '/tipOuts', newTipOut);
            const newTipOutsCreated = { id: tipOutId };

            // create record of new tip out in tipOuts key of store 
            console.log(newTipOutsCreated);
            this.props.firebase.pushWithMeta(`/stores/${this.state.newStore}/tipOuts`, newTipOutsCreated)
              .then((snapshot) => {
                console.log("Do I ever get here?", snapshot.key);
                this.props.firebase.update(`/tipOuts/${tipOutId}/`, { ref: snapshot.key });
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
              this.setState({ newDate: newValue });
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


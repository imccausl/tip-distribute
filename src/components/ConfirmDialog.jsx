import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import showModal from '../actions/modalActions';
import { deleteTipOut, deletePerson } from '../actions/delete';
import { deletePersonFromTipOut, populateTipOutList } from '../actions/tipOutActions';
import { getAllPeopleBelongingToTipOut } from '../helpers/currentTipOutHelpers';
import parseDate from '../helpers/dateHelpers';
import tipOutShape from '../models/tipOut.model';
import personShape from '../models/person.model';

function mapStateToProps(state) {
  return {
    modalAction: state.modalAction,
    tipOuts: state.firebase.data.tipOuts,
    users: state.firebase.data.users,
    people: state.firebase.data.people,
    stores: state.firebase.data.stores,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showModal,
    deleteTipOut,
    deletePerson,
    deletePersonFromTipOut,
    populateTipOutList,
  }, dispatch);
}

@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class ConfirmDialog extends Component {
  static propTypes = {
    modalAction: PropTypes.shape({
      modal: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isOpen: PropTypes.bool.isRequired,
      data: PropTypes.object.isRequired,
    }).isRequired,
    firebase: PropTypes.shape({
      set: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }).isRequired,
    showModal: PropTypes.func.isRequired,
    deleteTipOut: PropTypes.func.isRequired,
    currentTipOut: PropTypes.shape(tipOutShape).isRequired,
    currentPerson: PropTypes.shape(personShape).isRequired,
    deletePersonFromTipOut: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTipOut: null,
      currentPerson: null,
    };

    this.handleConfirmDeletePerson = this.handleConfirmDeletePerson.bind(this);
    this.handleConfirmDeleteTipOut = this.handleConfirmDeleteTipOut.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.modalAction) {
      if (newProps.modalAction.isOpen) {
        const currentTipOut = newProps.tipOuts[newProps.modalAction.data.tipOutRef] || '';
        const currentPerson = newProps.people[newProps.modalAction.data.personId];
        this.setState({ currentTipOut, currentPerson });
      }
    }
  }

  handleConfirmDeleteTipOut() {
    const { storeRef, tipOutRef } = this.props.modalAction.data
    const { tipOuts, people } = this.props;
    const { set, remove } = this.props.firebase;
    const { tipOut } = this.props.modalAction.data;

    // Remove the tipOut from firebase, and the tipOutsCreated record from profile,
    // and the tipOut belongsTo records in each user that is a member of the tipOut.
    const tipOutCreatedRecord = stores[storeRef].tipOuts[tipOutRef];
    const allPeople = getAllPeopleBelongingToTipOut(tipOuts[tipOutRef]);

    // remove tipOut from people's belongsTo record
    allPeople.forEach(person => {
      const belongsToRecord = people[person].belongsTo || null;

      // there may not be a belongsTo record for the person 
      // if the tip out hasn't been set as distributed. If it doesn't exist,
      // ignore it and carry on erasing the tip out from existence.
      if (belongsToRecord) {
        const newBelongsToRecord = belongsToRecord.filter(record => record.id !== tipOut.id);

        set(`/people/${person}/belongsTo/`, newBelongsToRecord)
          .then(()=>console.log("Removed from:", people[person])); // temporary placeholder for confirmation logic
      }
    });

    // remove tipOut from creator's tipOutsCreated record
    remove(`/stores/${tipOut.storeRef}/tipOuts/${tipOut.ref}`);
    // remove the tip out itself.
    remove(`/tipOuts/${tipOut.id}`, () => {
      // if deleting the tip out is successful, then remove it from the local
      // in-memory redux store and then close the modal.
      this.props.deleteTipOut(this.props.currentTipOut.id);
      this.props.showModal(false);
    });
  }

  handleConfirmDeletePerson() {
    const { tipOutRef, personKey, personId } = this.props.modalAction.data;
    const { people } = this.props;
    const { set, remove } = this.props.firebase;

    // if person is assigned an id, it means they have a record of belonging to this
    // tip out in the person database, so remove it too.
    if (personId) {
      const belongsToRecord = people[personId].belongsTo;
      const isHidden = people[personId].hidden;
      let newBelongsToRecord = belongsToRecord.filter(record => record.id !== tipOutRef);
      if (!newBelongsToRecord) {
        newBelongsToRecord = [];
      }

      this.props.firebase.set(`/people/${personId}/belongsTo`, newBelongsToRecord);
    }

    // remove person from tip out
    this.props.firebase.remove(`/tipOuts/${tipOutRef}/people/${personKey}`);
    this.props.showModal(false);
  }

  render() {
    let actions = [];
    let message = 'Are you sure?';
    let clickHandler = this.handleConfirmDeletePerson;

    const cancel = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => this.props.showModal(false)}
      />,
    ];

    if (!this.props.modalAction) {
      return null;
    }

    if (this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE') {
      clickHandler = this.handleConfirmDeleteTipOut;
      message = `Are you sure you want to permanently delete this tip out of $${this.props.currentTipOut.totalCash} for the week ending ${parseDate(this.props.currentTipOut.weekEnding)}?`;
    }

    if (this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE_PERSON') {
      message = `Are you sure you want to permanently remove ${this.state.currentPerson.displayName} from this tip out?`;
    }

    const deleteConfirm = (
      <RaisedButton
        label="Delete"
        backgroundColor="#ff0000"
        labelColor="#ffffff"
        onClick={clickHandler}
      />
    );

    actions = cancel.concat(deleteConfirm);

    if (this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE' || this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE_PERSON') {
      return (
        <Dialog
          title={this.props.modalAction.title}
          actions={actions}
          open={this.props.modalAction.isOpen}
        >
          {message}
        </Dialog>
      );
    }
    return null;
  }
}

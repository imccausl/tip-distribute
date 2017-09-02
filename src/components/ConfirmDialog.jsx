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

function mapStateToProps(state) {
  return {
    modalAction: state.modalAction,
    currentTipOut: state.currentTipOut,
    currentPerson: state.currentPerson,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, deleteTipOut, deletePerson }, dispatch);
}

@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class ConfirmDialog extends Component {
  render() {
    let actions = [];
    let message = 'Are you sure?';

    const cancel = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={() => this.props.showModal(false)}
      />,
    ];

    if (!this.props.modalAction || !this.props.currentTipOut) {
      return null;
    }

    if (this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE') {
      const deleteConfirm = (
        <RaisedButton
          label="Delete"
          backgroundColor="#ff0000"
          labelColor="#ffffff"
          onTouchTap={
            () => {
              this.props.deleteTipOut(this.props.currentTipOut.id);
              this.props.showModal(false);
            }
          }
        />
      );

      message = `Are you sure you want to permanently delete this tip out of $${this.props.currentTipOut.totalCash} for the week ending ${this.props.currentTipOut.weekEnding}?`;
      actions = cancel.concat(deleteConfirm);
    }

    if(this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE_PERSON') {
      const deleteConfirm = (
        <RaisedButton
          label="Delete"
          backgroundColor="#ff0000"
          labelColor="#ffffff"
          onTouchTap={
            () => {
              // remove user
              console.log("user:", this.props.modalAction.data.personKey, "tipOut:", this.props.modalAction.data.tipOutRef);
              this.props.firebase.remove(`/tipOuts/${this.props.modalAction.data.tipOutRef}/people/${this.props.modalAction.data.personKey}`).catch(err=>console.error(err));
              this.props.showModal(false);
            }
          }
        />
      );

      message = `Are you sure you want to permanently delete ${this.props.currentPerson.name} from this tip out?`;
      actions = cancel.concat(deleteConfirm);
    }

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

ConfirmDialog.propTypes = {

};


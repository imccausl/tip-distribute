import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import showModal from '../actions/modalActions';

class ConfirmDialog extends Component {
  render() {
    let actions = [];
    let message = 'Are you sure?';

    const cancel = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={() => this.props.showModal(false)}
      />
    ];

    if (!this.props.modalAction || !this.props.currentTipOut) {
      return null;
    }

    if(this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE') {
      const deleteConfirm = (
        <RaisedButton
          label="Delete"
          backgroundColor="#ff0000"
          labelColor="#ffffff"
          onTouchTap={
            () => {
              this.props.showModal(false);
            }
          }
        />
      );

      message = `Are you sure you want to permanently delete tip out of $${this.props.currentTipOut.totalCash} for the week ending ${this.props.currentTipOut.weekEnding}?`;
      actions = cancel.concat(deleteConfirm);
    }

    if (this.props.modalAction.modal === 'MODAL_CONFIRM_DELETE') {
      return (
        <Dialog
          title={this.props.modalAction.title}
          actions={actions}
          open={this.props.modalAction.isOpen}
        >
          <strong>{message}</strong>
        </Dialog>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    modalAction: state.modalAction,
    currentTipOut: state.currentTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

ConfirmDialog.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDialog);
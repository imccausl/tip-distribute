import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

@firebaseConnect()
export default class StoreDialog extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    firebase: PropTypes.shape({
      pushWithMeta: PropTypes.func.isRequired,
    }).isRequired,

  }

  constructor(props) {
    super(props);

    this.state = {
      storeNumber: '',
      storeName: '',
      storeAddress: '',
      storePhone: '',
      errStoreNumber: null,
      errStoreName: null,
      errStoreAddress: null,
      errStorePhone: null,
      hasError: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleCreateNewStore = this.handleCreateNewStore.bind(this);
  }

  handleClose() {
    this.props.handleClose();
  }

  handleCreateNewStore() {
    const { pushWithMeta } = this.props.firebase;
    const { storeNumber, storeName, storeAddress, storePhone, hasError } = this.state;
    const newStore = {
      storeNum: storeNumber,
      storeName,
      address: storeAddress,
      storePhone,
    };

    if (!hasError) {
      pushWithMeta('/stores', newStore).then(() => {
        console.log('New store created');
        this.handleClose();
      });
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onClick={this.handleClose}
      />,
      <RaisedButton
        label="Create"
        primary={true}
        onClick={this.handleCreateNewStore}
      />,
    ];

    return (
      <Dialog
        title="Create New Store"
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
        modal={false}
        actions={actions}
      >
        <TextField
          floatingLabelText="Store Name"
          hintText="Bay & Cumberland"
          onChange={(event, value) => this.setState({ storeName: value })}
        />
        <TextField
          floatingLabelText="Store Number"
          onChange={(event, value) => this.setState({ storeNumber: value })}
        />
        <TextField
          floatingLabelText="Store Phone Number"
          hintText="(XXX) XXX-XXXX"
          onChange={(event, value) => this.setState({ storePhone: value })}
        />
        <TextField
          floatingLabelText="Store Address"
          onChange={(event, value) => this.setState({ storeAddress: value })}          
        />
      </Dialog>
    );
  }
}
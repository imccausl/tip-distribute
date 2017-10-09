import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { Tabs, Tab } from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
  };

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
      expireLength: 90,
      roundToNearest: 'DOLLAR',
      hasError: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleCreateNewStore = this.handleCreateNewStore.bind(this);
    this.handleExpireSelect = this.handleExpireSelect.bind(this);
    this.handleRoundingSelect = this.handleRoundingSelect.bind(this);
  }

  handleClose() {
    this.props.handleClose();
  }

  handleCreateNewStore() {
    const { pushWithMeta } = this.props.firebase;
    const {
      storeNumber,
      storeName,
      storeAddress,
      storePhone,
      hasError,
      expireLength,
      roundToNearest,
    } = this.state;
    const newStore = {
      storeNum: storeNumber,
      storeName,
      address: storeAddress,
      storePhone,
      expireLengthDays: expireLength,
      roundToNearest,
    };

    if (!hasError) {
      pushWithMeta('/stores', newStore).then(() => {
        console.log('New store created');
        this.handleClose();
      });
    }
  }

  handleExpireSelect(e, i, value) {
    this.setState({ expireLength: value });
  }

  handleRoundingSelect(e, i, value) {
    this.setState({ roundToNearest: value });
  }

  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.handleClose} />,
      <RaisedButton label="Create" primary onClick={this.handleCreateNewStore} />,
    ];

    return (
      <Dialog
        autoScrollBodyContent
        open={this.props.isOpen}
        onRequestClose={this.handleClose}
        modal={false}
        actions={actions}
      >
        <Tabs>
          <Tab label="Info">
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
          </Tab>
          <Tab label="Options">
            <SelectField
              floatingLabelText="Tip Outs Expire After"
              value={this.state.expireLength}
              onChange={this.handleExpireSelect}
            >
              <MenuItem value={0} primaryText="Never" />
              <MenuItem value={30} primaryText="30 Days" />
              <MenuItem value={60} primaryText="60 Days" />
              <MenuItem value={90} primaryText="90 Days" />
            </SelectField>
            <SelectField
              floatingLabelText="Round Tip Outs To Nearest"
              value={this.state.roundToNearest}
              onChange={this.handleRoundingSelect}
            >
              <MenuItem value={'EXACT'} primaryText="Exact" />
              <MenuItem value={'NICKEL'} primaryText="Nickel" />
              <MenuItem value={'DIME'} primaryText="Dime" />
              <MenuItem value={'QUARTER'} primaryText="Quarter" />
              <MenuItem value={'DOLLAR'} primaryText="Dollar" />
            </SelectField>
          </Tab>
        </Tabs>
      </Dialog>
    );
  }
}

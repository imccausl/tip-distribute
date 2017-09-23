import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import WarnIcon from 'material-ui/svg-icons/alert/warning';
import ContentRemove from 'material-ui/svg-icons/navigation/cancel';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state) {
  return {

  };
}

@connect(mapStateToProps)
export default class StoreListItem extends Component {
  constructor(props) {
    super(props);

    this.handleRemoveStore = this.handleRemoveStore.bind(this);
  }

  handleRemoveStore() {
  }

  render() {
    const { storeData } = this.props;

    return (
      <Card style={{ maxWidth: '90%', margin: '5px auto' }}>
        <CardHeader
          title={storeData.address}
          subtitle={storeData.storeNum}
        />
        <CardActions>
          <FlatButton
            label={'Delete'}
            icon={<ContentRemove />}
            onClick={this.handleRemoveStore}
          />
        </CardActions>
      </Card>
    );
  }
}

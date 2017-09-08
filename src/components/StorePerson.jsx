import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Card, CardText, CardHeader, CardActions } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import WarnIcon from 'material-ui/svg-icons/alert/warning';
import ContentRemove from 'material-ui/svg-icons/navigation/cancel';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function mapStateToProps(state) {
  return {
    stores: state.firebase.data.stores,
  };
}

@firebaseConnect([])
@connect(mapStateToProps)
export default class StorePerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personName: this.props.name,
      partnerNum: this.props.partnerNum,
      personEmail: this.props.email || null,
      personStore: this.props.storeRef,
    };
  }

  render() {
    const hasEmail = () => {
      if (this.state.personEmail) {
        return <TextField floatingLabelText="Email" defaultValue={this.state.personEmail} />;
      }

      return (
        <Chip>
          <Avatar color="#444" icon={<WarnIcon />} />
          This person is not a registered user.
        </Chip>
      );
    };

    return (
      <Card style={{ maxWidth: '90%', margin: '5px auto' }}>
        <CardHeader
          style={{ backgroundColor: 'lightgrey' }}
          title={this.state.personName}
          subtitle={this.state.partnerNum}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <TextField
            floatingLabelText="Name"
            defaultValue={this.state.personName}
          />
          <TextField
            floatingLabelText="Partner Number"
            defaultValue={this.state.partnerNum}
          />
          <SelectField
            floatingLabelText="Store"
          >
            <MenuItem />
          </SelectField>
          {hasEmail()}
        </CardText>
        <Divider />
        <CardActions expandable={true}>
          <FlatButton
            label="Remove User"
            icon={<ContentRemove />}
          />
        </CardActions>
      </Card>
    );
  }
}

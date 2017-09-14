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
    people: state.firebase.data.people,
  };
}

@firebaseConnect()
@connect(mapStateToProps)
export default class StorePerson extends Component {
  constructor(props) {
    super(props);

    const storePeopleArr = this.props.stores[this.props.storeRef].people;
    this.state = {
      personName: this.props.name,
      partnerNum: this.props.partnerNum,
      personEmail: this.props.email || null,
      personStore: this.props.storeRef,
      prevName: null,
      prevEmail: null,
      prevPartnerNum: null,
      storePeople: storePeopleArr.map(person => this.props.people[person].displayName.toLowerCase()),
      storePartnerNums: storePeopleArr.map(person => this.props.people[person].partnerNum),
      nameError: '',
      partnerNumError: '',
      emailError: '',
      canUpdate: false,
    };

    this.doesPersonExist = this.doesPersonExist.bind(this);
    this.doesPartnerNumExist = this.doesPartnerNumExist.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const storePeopleArr = newProps.stores[newProps.storeRef].people;
    this.setState({
      storePeople: storePeopleArr.map(person => newProps.people[person].displayName),
      storePartnerNums: storePeopleArr.map(person => newProps.people[person].partnerNum),
    });
  }

  doesPersonExist(name) {
    if (this.state.storePeople.indexOf(name.toLowerCase()) > -1) {
      return true;
    }

    return false;
  }

  doesPartnerNumExist(num) {
    console.log(this.state.storePartnerNums);
    if (this.state.storePartnerNums.indexOf(num) > -1) {
      return true;
    }

    return false;
  }

  render() {
    const hasEmail = () => {
      if (this.state.personEmail) {
        return (
          <TextField
            floatingLabelText="Email"
            defaultValue={this.state.personEmail}
            onChange={
              (e) => {
                this.setState({ personEmail: e.target.value });
              }
            }
          />
        );
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
            errorText={this.state.nameError}
            onFocus={e => this.setState({ prevName: e.target.value })}
            onChange={
              (e) => {
                this.setState({ personName: e.target.value, canUpdate: true, nameError: '' });
                if (this.doesPersonExist(e.target.value)) {
                  this.setState({
                    canUpdate: false,
                    nameError: 'This person already exists',
                  });
                }
              }
            }
            onBlur={
              (e) => {
                if (this.state.canUpdate) {
                  this.setState({ canUpdate: false });
                  if (this.doesPersonExist(e.target.value)) {
                    this.setState({ personName: this.state.prevName });
                    return false;
                  }

                  this.props.firebase.update(`/people/${this.props.id}`,
                    {
                      displayName: e.target.value,
                    },
                  );
                  return true;
                }
                return false;
              }
            }
          />
          <TextField
            floatingLabelText="Partner Number"
            defaultValue={this.state.partnerNum}
            errorText={this.state.partnerNumError}
            onChange={
              (e) => {
                this.setState({ partnerNum: e.target.value, canUpdate: true, partnerNumError: '' });
                if (this.doesPartnerNumExist(e.target.value)) {
                  this.setState({
                    canUpdate: false,
                    partnerNumError: 'This partner number already exists',
                  });
                }
              }
            }
            onBlur={
              (e) => {
                if (this.state.canUpdate) {
                  if (this.doesPartnerNumExist(e.target.value)) {
                    this.setState({
                      canUpdate: false,
                      partnerNum: this.state.prevPartnerNum,
                    });
                    return false;
                  }

                  this.setState({ canUpdate: false });
                  this.props.firebase.update(`/people/${this.props.id}`,
                    {
                      partnerNum: e.target.value,
                    },
                  );
                  return true;
                }
                return false;
              }
            }
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

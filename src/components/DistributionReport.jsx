/* Distribution.jsx
 * Display the total tipout for each employee and
 * allows for the attaching of messages and checking of status.
 *
 * TODO: Add character restriction to message (240 char).
 * TODO: Pull out individual person card view into its own component.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import GenericAvatar from 'material-ui/svg-icons/action/face';
import { hideModal } from '../actions/modalActions';
import { calculateWage, roundTipOutToNearest } from '../helpers/populateStateHelpers';
import parseDate from '../helpers/dateHelpers';
import { sortByLastName, calculateExpiry } from '../helpers/currentTipOutHelpers';

@firebaseConnect()
class Distribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: !this.props.viewModel ? null : this.props.viewModel.people,
      tipOutId: !this.props.viewModel.id ? null : this.props.viewModel.id,
      storeData: !this.props.viewModel.storeRef ? null : this.props.stores[this.props.viewModel.storeRef],
      open: false,
      canUpdateMessage: false,
      hourlyAmount: '',
    };

    this.handleFinalizeTipOut = this.handleFinalizeTipOut.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      people: !newProps.viewModel ? null : newProps.viewModel.people,
      tipOutId: !newProps.viewModel.id ? null : newProps.viewModel.id,
      storeData: !newProps.viewModel.storeRef ? null : newProps.stores[newProps.viewModel.storeRef],
      canUpdateMessage: false,
      open: newProps.isOpen,
    });
  }

  handleMessageChange(person, message) {
    const { update } = this.props.firebase;
    const { tipOutId } = this.state;

    update(`/tipOuts/${tipOutId}/people/${person}`, { message }).then(() =>
      console.log('Updated message.'),
    );
  }

  makeRows() {
    const { finalizedOn } = this.props.viewModel;
    const { expireLengthDays } = this.state.storeData;

    if (!this.state.people) {
      return null;
    }

    const tipChipStyle = {
      margin: '5px',
      backgroundColor: 'lightgreen',
    };

    const getTipOut = hours => {
      if (!hours || !this.state.people) {
        return 0;
      }

      const roundTo = this.state.storeData.roundToNearest;
      const hourlyAmount = calculateWage(this.props.viewModel);
      // calculating the hourly amount here is expensive: it does it for every single person.
      // move to componentWillReceiveProps() and do it once, only if/when props (ie. viewModel) change.
      console.log('Hourly amount:', hourlyAmount); // I keep this here to remind me to make this calculation more performant

      return roundTipOutToNearest(hourlyAmount, parseFloat(hours), roundTo);
    };

    return Object.keys(sortByLastName(this.state.people)).map(key => {
      const person = this.state.people[key];

      if (!person) {
        return null;
      }

      const personName = this.props.allPeople[person.id].displayName;
      const wage = getTipOut(person.hours);

      const barStyle = {
        width: `${wage * this.props.viewModel.totalCash / this.props.viewModel.totalCash + 50}px`,
        maxWidth: '100%',
        backgroundColor: 'lightblue',
        fontSize: '20px',
        padding: '5px',
        margin: '5px 0 0 58px',
        color: 'black',
      };

      function displayStatus() {
        if (!finalizedOn) return null;

        const expiresIn = calculateExpiry(finalizedOn, expireLengthDays);

        if (expiresIn < 10) {
          tipChipStyle.backgroundColor = 'orange';
        }

        if (expiresIn <= 0) {
          tipChipStyle.backgroundColor = 'red';
        }

        return (
          <CardText expandable>
            <h2>Status</h2>
            <Chip style={tipChipStyle}>Tip Out {(expiresIn <= 0) ? 'Has Expired!' : `Expires in ${expiresIn} Days`}</Chip>
            <Chip style={tipChipStyle}>{`${personName} hasn't picked up this tip out yet`}</Chip>
          </CardText>
        );
      }

      return (
        <Card style={{ marginBottom: '5px' }} key={person.id}>
          <CardHeader
            title={personName}
            subtitle={`Worked ${person.hours} hours`}
            avatar={
              <Avatar>
                <GenericAvatar />
              </Avatar>
            }
            showExpandableButton
            actAsExpander
          >
            <div className="bar" style={barStyle}>
              {`$${wage}`}
            </div>
          </CardHeader>
          <Divider />
          <CardText expandable>
            <div>
              <h2>Message</h2>
              <TextField
                multiLine
                hintText="Attach a message to this tip out by typing it here."
                style={{ padding: '0 5px', width: '90%' }}
                rows={3}
                defaultValue={person.message || ''}
                // onFocus={() => this.setState({ canUpdateMessage: true })}
                onBlur={event => {
                  if (this.state.canUpdateMessage) {
                    this.setState({ canUpdateMessage: false });
                    this.handleMessageChange(key, event.target.value);
                  }
                }}
                onChange={() => this.setState({ canUpdateMessage: true })}
              />
            </div>
          </CardText>
          <Divider />
          {displayStatus()}
        </Card>
      );
    });
  }

  handleFinalizeTipOut() {
    const { update } = this.props.firebase;
    const { id } = this.props.viewModel;
    const updatedProperties = {
      isDistributed: true,
      finalizedOn: Date.now(),
    };

    update(`/tipOuts/${id}`, updatedProperties).then(() => console.log('Finalized!'));
  }

  render() {
    if (!this.props.viewModel) return null;
    const actions = [<FlatButton label="Close" primary onClick={() => {}} />];

    return (
      <div>
        <Toolbar style={{ position: 'fixed', left: '0', top: '60px', width: '100%', zIndex: '5' }}>
          <ToolbarGroup firstChild>
            <div style={{ fontFamily: 'Roboto', paddingLeft: '25px' }}>
              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                {`Week Ending ${parseDate(this.props.viewModel.weekEnding)}`}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
                {`$${this.props.viewModel.totalCash} | ${this.props.viewModel
                  .totalHours} hrs | $${parseFloat(this.props.viewModel.hourlyWage).toFixed(2)}/hr`}
              </div>
            </div>
          </ToolbarGroup>
          <ToolbarGroup lastChild>
            <RaisedButton label="Finalize" primary onClick={this.handleFinalizeTipOut} />
          </ToolbarGroup>
        </Toolbar>
        <div style={{ margin: '120px 5px 5px 5px' }}>{this.makeRows()}</div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideModal }, dispatch);
}
export default connect(mapDispatchToProps)(Distribution);

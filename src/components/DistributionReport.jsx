/* Distribution.jsx
 * Display the total tipout for each employee 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import GenericAvatar from 'material-ui/svg-icons/action/face';
import { hideModal } from '../actions/modalActions';
import { calculateWage } from '../helpers/populateStateHelpers';
import parseDate from '../helpers/dateHelpers';

@firebaseConnect()
class Distribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: !this.props.viewModel ? null : this.props.viewModel.people,
      open: false,
      hourlyAmount: '',
    };

    this.handleFinalizeTipOut = this.handleFinalizeTipOut.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      people: !newProps.viewModel ? null : newProps.viewModel.people,
      open: newProps.isOpen,
    });
  }

  makeRows() {
    if (!this.state.people) {
      return null;
    }

    const getTipOut = hours => {
      if (!hours || !this.state.people) {
        return 0;
      }

      const hourlyAmount = calculateWage(this.props.viewModel);
      // calculating the hourly amount here is expensive: it does it for every single person.
      // move to componentWillReceiveProps() and do it once, only if/when props (ie. viewModel) change.
      console.log('Hourly amount:', hourlyAmount);

      return Math.round(parseFloat(hours) * hourlyAmount);
    };

    return Object.keys(this.state.people).map(key => {
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
            actAsExpander
          >
            <div className="bar" style={barStyle}>
              {`$${wage}`}
            </div>
          </CardHeader>
          <Divider />
          <CardText expandable />
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
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {`Week Ending ${parseDate(this.props.viewModel.weekEnding)}`}
              </div>
              <div style={{ fontSize: '14px', fontWeight: 'normal' }}>
                {`$${this.props.viewModel.totalCash} | ${this.props.viewModel
                  .totalHours} hours | ${parseFloat(this.props.viewModel.hourlyWage).toFixed(
                  2,
                )}/hour`}
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

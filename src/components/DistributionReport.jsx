/* Distribution.jsx
 * Display the total tipout for each employee 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Table, { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { hideModal } from '../actions/modalActions';
import { calculateTotalHours, calculateWage } from '../helpers/populateStateHelpers';
import parseDate from '../helpers/dateHelpers';

class Distribution extends Component {
  constructor(props) {
    super(props);

    this.state = { people: (!this.props.tipOut) ? null : this.props.tipOut.people, open: false };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ people: (!newProps.tipOut) ? null : newProps.tipOut.people, open: newProps.isOpen });
  }

  makeRows() {
    if (!this.state.people) {
      return null;
    }

    const getTipOut = (hours) => {
      if (!hours || !this.state.people) {
        return 0;
      }

      // const totalHours = calculateTotalHours(this.props.tipOut);
      const hourlyAmount = calculateWage(this.props.tipOut);
      console.log("Hourly amount:", hourlyAmount);

      return Math.round(parseFloat(hours) * hourlyAmount);
    }

    return Object.keys(this.state.people).map((key) =>
      {
        const person = this.state.people[key];

        if (!person) {
          return null;
        }

        const wage = getTipOut(person.hours);

        const barStyle = {
          width: `${((wage * this.props.tipOut.totalCash) / 100) + 20}px`,
          maxWidth: '100%',
          backgroundColor: 'lightblue',
          fontSize: '20px',
          padding: '5px',
          margin: '0',
          color: 'black',
        };

        return (
          <Card style={{marginBottom: '5px'}} key={person.id}>
            <CardHeader 
              title={person.name}
              subtitle={`Worked ${person.hours} hours`}
            />
            <CardText>
              <div
                className="bar"
                style={barStyle}
              >
              {`$${wage}`}
              </div>
            </CardText>
            </Card>
    )});
  }

  render() {
    if (!this.props.tipOut) return null;
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={() => {
          
        }}
      />,
    ];

  return (
    <Card>
      <CardHeader
        title={`Week Ending ${parseDate(this.props.tipOut.weekEnding)}`}
        subtitle={`$${this.props.tipOut.totalCash} earned for ${this.props.tipOut.totalHours} hours | ${parseFloat(this.props.tipOut.hourlyWage).toFixed(2)}/hour`}
      />
      <CardText>
        {this.makeRows()}
      </CardText>
    </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOut: state.currentTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideModal }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Distribution);

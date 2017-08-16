/* Distribution.jsx
 * Display the total tipout for each employee 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import Table, { TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { hideModal } from '../actions/modalActions';

const dialogStyle = {
  width: '80%',
  maxWidth: 'none',
  height: '100vh',
  maxHeight: 'none',
};

class Distribution extends Component {
  constructor(props) {
    super(props);

    this.state = { people: (!this.props.tipOut) ? null : this.props.tipOut.employees, open: false };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ people: (!this.props.tipOut) ? null : this.props.tipOut.employees, open: newProps.isOpen });
  }

  makeRows() {
    if (!this.state.people) {
      return null;
    }

    const getTipOut = (hours) => {
      if (!hours || !this.state.people) {
        return 0;
      }

      const allHours = this.state.people.map( employee => {
        if (!employee) {
          return 0;
        }

        return parseFloat(employee.hours);
      });

      const totalHours = allHours.reduce((prev, curr) => prev + curr);
      const hourlyAmount = parseFloat(this.props.tipOut.totalCash) / totalHours;
      console.log("Hourly amount:", hourlyAmount);

      return Math.round(parseFloat(hours) * hourlyAmount)
       ;
    }

    return this.state.people.map((employee) =>
      {
        if (!employee) {
          return null;
        }

        return (
      <TableRow key={employee.id}>
        <TableRowColumn>{employee.name}</TableRowColumn>
        <TableRowColumn>{employee.hours}</TableRowColumn>
        <TableRowColumn>{'$' + getTipOut(employee.hours)}</TableRowColumn>
      </TableRow>
    )});
  }

  getTotalHours() {
    if (!this.state.people) {
      return 0;
    }

    return Math.round(this.state.people.map(person => parseFloat(person.hours)).reduce((sum, curr) => sum + curr));
  }

  getTotalTipOut() {
  }

  render() {
  if (!this.props.tipOut) return null;
  console.log(this.props.tipOut);
  const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={() => {
          this.props.resetState();
          this.setState({ open: false });
        }}
      />,
    ];

  return (
  <Dialog
    title="Tip Distribution Report"
    open={this.state.open}
    contentStyle={dialogStyle}
    autoScrollBodyContent={true}
    modal={true}
    actions={actions}
    >
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Hours ({this.getTotalHours()})</TableHeaderColumn>
            <TableHeaderColumn>Tip Out</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.makeRows()}
         
        </TableBody>
      </Table>
    </Dialog>
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

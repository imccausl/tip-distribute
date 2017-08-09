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
  width: '100%',
  maxWidth: 'none',
  height: '100vh',
  maxHeight: 'none',
};

class Distribution extends Component {
  makeRows() {
    const getTipOut = (hours) => {
      if (!hours || !this.props.tipOut.tipOut.employees) {
        return 0;
      }

      const allHours = this.props.tipOut.tipOut.employees.map( employee => {
        if (!employee) {
          return 0;
        }

        return parseInt(employee.hours, 10)
      });

      const totalHours = allHours.reduce((prev, curr) => prev + curr);
      const hourlyAmount = parseInt(this.props.tipOut.totalCash, 10) / totalHours;

      return Math.floor(parseInt(hours, 10) * hourlyAmount);
    }

    return this.props.tipOut.tipOut.employees.map( employee => 
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

  render() {
  if (!this.props.tipOut) return null;
  console.log(this.props.tipOut.tipOut);
  const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.props.hideModal}
      />,
    ];

  return (
  <Dialog 
    open={this.props.open}
    contentStyle={dialogStyle}
    autoScrollBodyContent={true}
    modal={true}
    actions={actions}
    >
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Hours</TableHeaderColumn>
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
    tipOut: state.activeTipOut,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideModal }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Distribution);

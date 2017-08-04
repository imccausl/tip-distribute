/* Employee.jsx
 * Allow editing of Employee name and Hours Worked for tip out calculation
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card, { CardActions, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { hideModal } from '../actions/modalActions';

class Employee extends Component {
  render() {
    if (!this.props.employee) {
      return null;
    } 

    return (  
      <Dialog
        modal={false}
        onRequestClose={() => this.props.hideModal()}
        autoScrollBodyContent={true}
        open={this.props.open}
      >
        <Card>
          <CardTitle
            title="Employee Profile"
          />
          <CardText>
            <TextField
              floatingLabelText="Employee Name"
              value={this.props.employee.name}
            />
            <TextField
              floatingLabelText="Tippable Hours Worked"
              value={this.props.employee.hours}
            />
          </CardText>
          <CardActions>
            <RaisedButton
              label="Cancel"
              onTouchTap={() => this.props.hideModal()}
            />
            <RaisedButton
              label="Save"
              primary={true}
            />
          </CardActions>
        </Card>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    employee: state.activeEmployee,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee);

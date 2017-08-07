import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SinglePerson from './SinglePerson.jsx';
import { hideAddPeopleDialog } from '../actions/toggleAddPeopleDialog';

class AddPeople extends Component {
  constructor(props) {
    super(props);

    let tempId = 0;
    const newPeople = [{ id: tempId += 1, name: '', hours: 0 }];
    this.state = { newPeople };
    this.addPeopleHandler = this.addPeopleHandler.bind(this);
  }

  addPeopleHandler(tempId) {
    const parsedDate = Date.parse(tempId)
    const randomizer = Math.floor(Math.random() * parsedDate); // prevent unique key errors if button is clicked more than once a second
    const id = parsedDate + randomizer;

    console.log(parsedDate, randomizer, id);
    const newElement = this.state.newPeople.concat({ id, name: '', hours: 0 });

    this.setState({ newPeople: newElement });
  }

  render() {
    const tempId = new Date();
    const addPeople = this.state.newPeople.map(
      person => <SinglePerson addPerson={() => this.addPeopleHandler(tempId)} key={person.id} name={person.name} hours={person.hours} />);

    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.props.hideAddPeopleDialog()}
      />,
      <FlatButton
        primary={true}
        keyboardFocused={true}
        label="Add People"
      />,
    ];

    return (
      <Dialog
        title="Add People To Tip Out"
        actions={actions}
        autoScrollBodyContent={true}
        open={this.props.open}
      >
        {addPeople}
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.toggleAddPeopleDialog,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideAddPeopleDialog }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPeople);

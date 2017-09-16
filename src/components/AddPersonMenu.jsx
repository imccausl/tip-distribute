import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import AutoComplete from 'material-ui/AutoComplete';
import SuperSelectField from 'material-ui-superselectfield';
import Popover from 'material-ui/Popover';
import Subheader from 'material-ui/Subheader';
import * as tpHelpers from '../helpers/currentTipOutHelpers';

@firebaseConnect()
export default class SearchMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewModel: this.props.viewModel,
      peopleList: this.props.peopleList,
    };

    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.addPersonToTipOut = this.addPersonToTipOut.bind(this);
    this.createNewPerson = this.createNewPerson.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      viewModel: newProps.viewModel,
      peopleList: newProps.peopleList,
    });
  }

  handleNewRequest(e, arr) {
    const { peopleList, viewModel } = this.state;

    if (arr === -1) {
      const personIndex = tpHelpers.getIndexOfPerson(peopleList, e);
      if (personIndex > -1) {
        console.log("Personexists!");
        this.setState({ nameText: peopleList[personIndex].name });
      } else {
        // person does not exist, create a new person record and add to current store
        // TODO: Another case: person exists, but is not from the store (phantom case)
      }
    } else {
      // Add user who already has a people record
      this.addPersonToTipOut(e.id, e.name);
    }
  }

  addPersonToTipOut(id, name) {
    const { pushWithMeta, set } = this.props.firebase;
    const { viewModel, peopleList } = this.state;
    const addPerson = {
      id,
      name,
      belongsTo: viewModel.id,
      hours: '',
    };

    pushWithMeta(`/tipOuts/${viewModel.id}/people`, addPerson).then((snapshot) => {
      // change to set off snackbar on employeelist
      // this.setState({ hasUpdated: true, updateType: 'Added', myKey: snapshot.key });

      const personBelongsToRecord = peopleList[id].belongsTo;
      const newPersonBelongsToRecord = personBelongsToRecord.concat({
        id: viewModel.id,
        isPending: true,
        pickedUp: false,
      });

      set(`/people/${id}/belongsTo`, newPersonBelongsToRecord)
        .catch(err => console.log(err)); // temporary error handling placeholder
    }).catch(err => console.log(err)); // temporary error handling placeholder
  }

  createNewPerson() {

  }

  render() {
    const { viewModel, peopleList } = this.props;
    const currentlyAddedUsers = tpHelpers.getPeopleFromTipOut(viewModel);
    const allowedUserIds = tpHelpers.filterUsersAddedToTipOut(peopleList, currentlyAddedUsers);
    const searchMenu = allowedUserIds.map((id) => {
      return {
        name: peopleList[id].displayName,
        id,
      };
    });
    const autoCompleteConfig = {
      text: 'name',
      value: 'id',
    };

    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        zDepth={3}
        onRequestClose={() => {
          this.props.closeMenu();
        }}
        useLayerForClickAway={false}
        canAutoPosition={false}
      >
        <AutoComplete
          style={{ padding: '0 10px', overflow: 'hidden' }}
          name="getPeople"
          floatingLabelText="Add Person"
          hintText="Person Name"
          dataSource={searchMenu}
          dataSourceConfig={autoCompleteConfig}
          filter={AutoComplete.fuzzyFilter}
          onNewRequest={this.handleNewRequest}
          openOnFocus={true}
          maxSearchResults={5}
        />
      </Popover>
    );
  }
}
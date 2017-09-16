import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import AutoComplete from 'material-ui/AutoComplete';
import Popover from 'material-ui/Popover';
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
    const { stores } = this.props;
    const storePeopleIds = stores[viewModel.storeRef].people;
    const storePeopleList = storePeopleIds.map(id => peopleList[id]);
    const tipOutPeople = tpHelpers.getAllPeopleBelongingToTipOut(viewModel);

    if (arr === -1) { // enter pressed
      const personIndex = tpHelpers.getIndexOfPerson(storePeopleList, e);
      if (personIndex > -1) {
        // person exists in store record, but at this point could also be on the tip out so
        // get the person's id and displayName (so we can add their name in regular case)
        const personId = tpHelpers.getIdOfStorePersonFromName(
          e,
          viewModel.storeRef,
          stores,
          peopleList,
        );
        const personName = peopleList[personId].displayName;
        // check if this id already exists on the tip out
        const currentTipOutIds = Object.keys(viewModel.people).map(key => viewModel.people[key].id);
        if (currentTipOutIds.indexOf(personId) === -1) {
          // person doesn't belong to this tip out, so add them (otherwise do nothing)!
          this.addPersonToTipOut(personId, personName);
        }
        this.props.closeMenu();
      } else {
        // person does not exist, create a new person record and add to current store
        this.createNewPerson(e);
        this.props.closeMenu();
        // TODO: Another case: person exists, but is not from the store (phantom case)
      }
    } else {
      // Add user who already has a people record
      this.addPersonToTipOut(e.id, e.name);
      this.props.closeMenu();
    }
  }

  addPersonToTipOut(id, name) {
    const { pushWithMeta, set } = this.props.firebase;
    const { viewModel, peopleList } = this.state;
    const addPerson = {
      id,
      belongsTo: viewModel.id,
      hours: '',
    };

    pushWithMeta(`/tipOuts/${viewModel.id}/people`, addPerson).then((snapshot) => {
      // change to set off snackbar on employeelist
      // this.setState({ hasUpdated: true, updateType: 'Added', myKey: snapshot.key });

      let personBelongsToRecord = peopleList[id].belongsTo;
      if (!personBelongsToRecord) {
        personBelongsToRecord = [];
      }

      const newPersonBelongsToRecord = personBelongsToRecord.concat({
        id: viewModel.id,
        isPending: true,
        pickedUp: false,
      });

      set(`/people/${id}/belongsTo`, newPersonBelongsToRecord)
        .catch(err => console.log(err)); // temporary error handling placeholder
    }).catch(err => console.log(err)); // temporary error handling placeholder
  }

  createNewPerson(name) {
    // create a new person and return the id

    const { pushWithMeta, set } = this.props.firebase;
    const { viewModel } = this.state;

    const newPerson = {
      displayName: name,
      partnerNum: '',
      userRef: '',
      storeRef: viewModel.storeRef,
      totalHours: null,
      belongsTo: [],
    };

    pushWithMeta('/people', newPerson)
      .then(snapshot => this.addPersonToTipOut(snapshot.key, name));
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
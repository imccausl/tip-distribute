/* TipOutToolbar Workflow
 * Creating a new user: tips can only be assigned to people who either work at the store, or
 * who are "phantoms" (substitute workers) from another store. In short, tip amounts and hours
 * effectively "belong" to a store, and people receiving tips from this fund have to "belong"
 * to that store.
 * 
 * At first, I approached this workflow like a spreadsheet. New users created by clicking the 
 * "add new user" button would create a "blank" user, populated with whatever name and however 
 * many hours the creator wanted. But this workflow doesn't work particularly well in this case,
 * because it leaves open the opportunity to create duplicate entries. Anyone added to a tip out has
 * to also have a record in the "people" database. They are not simply a name, but a reference to this people
 * database. 
 * 
 * Consequently, I make use of MaterialUI's AutoComplete component in order to add a new user and there
 * are two ways to do this: 1) choose a user from the autocomplete list, which should filter out users
 * that have already been added to the tip out; 2) allow for the creation of a new user, who will then
 * be added to the store's "person" database. This case works well in the event that there has been a new hire
 * since the last tip out, and allows the tip out creator to add a new person to the store list quickly
 * without having to first edit the list of store employees: it's a way to quickly combine the step of
 * adding a new employee to the store's list AND add them to the tip out simultaneously.
 */ 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';
import ContentAdd from 'material-ui/svg-icons/social/person-add';
import { showDrawer } from '../actions/drawerActions';
import showModal from '../actions/modalActions';
import selectPeople from '../actions/selectEmployees';
import updateTipOuts from '../actions/updateTipOuts';
import AddPersonMenu from './AddPersonMenu.jsx';
import makeNewId from '../helpers/makeNewId';
import parseDate from '../helpers/dateHelpers';

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    open: state.showModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    showDrawer,
    showModal,
    updateTipOuts,
    selectPeople,
  }, dispatch);
}

@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class TipAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = { distributionOpen: false, addPersonOpen: false };
  }

  MainMenu() {
    const { tipOut } = this.props;

    return (
      <div>
        <MenuItem
          disabled={!(this.props.viewModel)}
          primaryText="Distribute Tips"
          leftIcon={<MoneyIcon />}
          onClick={() => this.setState({ distributionOpen: true })}
        />
        <Divider />
        <MenuItem
          disabled={!(this.props.viewModel)}
          primaryText="Edit..."
          leftIcon={<EditIcon />}
          onClick={
            () => {
              this.props.showModal(true, 'EDIT_TIP_OUT_MODAL', 'Edit Tip Out');
            }
          }
        />
        <MenuItem
          disabled={!(this.props.viewModel)}        
          primaryText="Delete..."
          leftIcon={<DeleteIcon />}
          onClick={
            () => {
              this.props.showModal(true, 'MODAL_CONFIRM_DELETE', 'Delete Tip Out', { tipOut });
            }
          }
        />
      </div>
    );
  }

  render() {
    let headerText = '';
    const { viewModel } = this.props;

    if (!viewModel) {
      headerText = 'No Tipout Selected';
    } else {
      headerText = parseDate(viewModel.weekEnding).concat(' | $', viewModel.totalCash);
    }

    return (
      <div style={{ position: 'fixed', zIndex: '5', width: '100%', top: '60px', left: '0' }}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={headerText} />
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <IconButton
              disabled={!(viewModel)}
              tooltip="Add person to tipout"
              onClick={() => {
                this.setState({ addPersonOpen: true });
              //   const { push, update } = this.props.firebase;
              //   // if you create a new person, it is not saved to firebase until
              //   // you fill in the data -- either choosing a person who already has
              //   // a people record, or creating a new people record for the person.
              //   const newPerson = {
              //     belongsTo: viewModel.id,
              //     id: '',
              //     name: '',
              //     hours: '',
              //   };

              //   push(`/tipOuts/${viewModel.id}/people`, newPerson)
              //     .then(snapshot => update(`/tipOuts/${viewModel.id}/people/${snapshot.key}`, { ref: snapshot.key}));
              // }
              }}
            >
              <SvgIcon><ContentAdd /></SvgIcon>
              <AddPersonMenu 
                open={this.state.addPersonOpen}
              />
            </IconButton>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              {this.MainMenu()}
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

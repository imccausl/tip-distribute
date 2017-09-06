import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SelectIcon from 'material-ui/svg-icons/content/select-all';
import CreateIcon from 'material-ui/svg-icons/content/add-box';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import CombineIcon from 'material-ui/svg-icons/editor/merge-type';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TipOutList from './TipOutList.jsx';
import NewTipOut from './NewTipOut.jsx';
import showModal from '../actions/modalActions';
import { hideDrawer } from '../actions/drawerActions';
import { populateState } from '../actions/tipOutActions';

@firebaseConnect([
  '/tipOuts',
  '/stores',
])
class TipOutDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: this.props.drawerOpen };
  }

  componentWillReceiveProps(newProps) {
    this.getTipOutsFromProfile(newProps);
  }

  getTipOutsFromProfile(newProps) {
    const {
      profile,
      tpRequested,
      tpRequesting,
      people,
      users,
      stores,
      fbTipOuts,
      firebase,
      id,
    } = newProps;

    if ((profile.isLoaded === true && profile.isEmpty === false) &&
       (tpRequested === true && tpRequesting === false)) {
      if (users && people && stores) {
        // Tips belonging to is always run no matter what kind of user
        this.props.populateState({ profile, fbTipOuts, stores, people }, 'TIPS_BELONGING_TO');

        // Tip Outs are only loaded if user is an admin, signified by code 1r.
        console.log(profile.role);
        if (profile.role === '1r') {
          console.log("You are logged in as an administrator");
          this.props.populateState({
            profile,
            fbTipOuts,
            stores,
            people,
          });
        }
      }
    }
  }

  tipOutsMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          primaryText="New Tip Out..."
          leftIcon={<CreateIcon />}
          onTouchTap={
            () => {
              this.props.showModal(true, 'ADD_NEW_TIP_OUT', 'Add New Tip Out');
            }}
        />
        <Divider />
        <MenuItem
          leftIcon={<CombineIcon />}
          primaryText="Combine Tip Outs..."
        />
        <MenuItem
          leftIcon={<DeleteIcon />}
          primaryText="Delete Tip Outs..."
        />
      </IconMenu>
    );
  }

  render() {
    const { people, users } = this.props;
    if (!this.props.data) {
      //this.props.showModal(true, 'ADD_NEW_TIP_OUT', 'Add New Tip Out');
    }

    return (
      <div>
        <Drawer
          zDepth={1}
          open={this.props.drawerOpen}
          docked={false}
          onRequestChange={() => this.props.hideDrawer()}
        >
          <Toolbar>
            <ToolbarTitle text="Tips" /> 
            <ToolbarGroup>
              <IconButton><SelectIcon /></IconButton>
              {this.tipOutsMenu()}
            </ToolbarGroup>
          </Toolbar>
          <TipOutList />
        </Drawer>
        <NewTipOut people={people} open={this.state.newTipOutOpen} />
      </div>
    );
  }
}

TipOutDrawer.propTypes = {
  showModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    profile: state.firebase.profile,
    id: state.firebase.auth.uid,
    fbTipOuts: state.firebase.data.tipOuts,
    tpRequested: state.firebase.requested.tipOuts,
    tpRequesting: state.firebase.requesting.tipOuts,
    tpTimestamp: state.firebase.timestamps.tipOuts,
    people: state.firebase.data.people,
    users: state.firebase.data.users,
    stores: state.firebase.data.stores,
    data: state.firebase.data,
    uid: state.firebase.auth.uid,
    view: state.activeView,
    currentTipOut: state.currentTipOut,
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, hideDrawer, populateState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutDrawer);

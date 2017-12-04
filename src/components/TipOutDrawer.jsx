import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class TipOutDrawer extends Component {
  tipOutsMenu() {
    return (
      <IconButton
        tooltip="New Tip Out..."
        onClick={
          () => {
            this.props.showModal(true, 'ADD_NEW_TIP_OUT', 'Add New Tip Out', { currTipOutId: 'NEW_TIP_OUT' });
          }}
      >
        <CreateIcon />
      </IconButton>

    );
  }

  render() {
    const { userAppState, adminAppState, people, users, stores, profile, newTipOutOpen } = this.props;

    if (!adminAppState) {
      // this.props.showModal(true, 'ADD_NEW_TIP_OUT', 'Add New Tip Out');
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
              {this.tipOutsMenu()}
            </ToolbarGroup>
          </Toolbar>
          <TipOutList
            userAppState={userAppState}
            adminAppState={adminAppState}
            people={people}
            users={users}
          />
        </Drawer>
        <NewTipOut
          people={people}
          profile={profile}
          stores={stores}
          adminAppState={adminAppState}
          open={newTipOutOpen}
        />
      </div>
    );
  }
}

TipOutDrawer.propTypes = {
  showModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    view: state.activeView,
    newTipOutOpen: state.modalAction,
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, hideDrawer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutDrawer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TipOutList from './TipOutList.jsx';
import NewTipOut from './NewTipOut.jsx';
import showModal from '../actions/modalActions';
import { hideDrawer } from '../actions/drawerActions';


class TipOutDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: this.props.drawerOpen };
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
          onTouchTap={
            () => {
              this.props.showModal(true, 'ADD_NEW_TIP_OUT', 'Add New Tip Out');
            }}
        />
        <Divider />
        <MenuItem primaryText="Combine Tip Outs..." />
        <MenuItem primaryText="Delete Tip Outs..." />
      </IconMenu>
    );
  }

  render() {
    if (!this.props.data[0] || !this.props.data) {
      this.props.showModal(true, 'ADD_NEW_TIP_OUT', 'Add New Tip Out');
    }

    return (
      <div>
        <Drawer
          open={this.props.drawerOpen}
          docked={false}
          onRequestChange={() => this.props.hideDrawer()}
        >
          <Toolbar>
            <ToolbarTitle text="Tip Outs" />
            <ToolbarGroup>
              {this.tipOutsMenu()}
            </ToolbarGroup>
          </Toolbar>
          <TipOutList />
        </Drawer>
        <NewTipOut open={this.state.newTipOutOpen} />
      </div>
    );
  }
}

TipOutDrawer.propTypes = {
  showModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    data: state.dataTree,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal, hideDrawer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutDrawer);

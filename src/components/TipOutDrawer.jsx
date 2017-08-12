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

class TipOutDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true };
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
              this.props.showModal('ADD_NEW_TIP_OUT', true);
            }}
        />
        <Divider />
        <MenuItem primaryText="Combine Tip Outs..." />
        <MenuItem primaryText="Delete Tip Outs..." />
      </IconMenu>
    );
  }

  render() {
    console.log("TipOutDrawer State:", this.state);
    if (!this.props.tipOuts[0] || !this.props.tipOuts) {
      this.props.showModal('ADD_NEW_TIP_OUT', true);
    }

    return (
      <div>
        <Drawer
          open={this.props.drawerOpen}
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
    tipOuts: state.tipOuts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutDrawer);

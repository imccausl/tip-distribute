import React, { Component } from 'react';
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
import { showNewTipOutDialog } from '../actions/newTipOutDialogActions';

class TipOutDrawer extends Component {
  tipOutsMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem 
          primaryText="New Tip Out..."
          onTouchTap={() => this.props.showNewTipOutDialog()}
        />
        <Divider />
        <MenuItem primaryText="Combine Tip Outs..." />
        <MenuItem primaryText="Delete Tip Outs..." />
      </IconMenu>
    );
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.props.drawerOpen}
        >
          <Toolbar>
            <ToolbarTitle text="Tip Out History" />
            <ToolbarGroup>
              {this.tipOutsMenu()}
            </ToolbarGroup>
          </Toolbar>
          <TipOutList />
        </Drawer>
        <NewTipOut isOpen={this.props.newTipOut} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    newTipOut: state.showTipOutDialog,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showNewTipOutDialog }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutDrawer);

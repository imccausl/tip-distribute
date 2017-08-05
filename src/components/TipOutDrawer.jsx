import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';  
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import TipOutList from './TipOutList.jsx';

class TipOutDrawer extends Component {
  constructor(props) {
    super(props);
  }

  tipOutsMenu() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="New Tip Out..." />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
  };
}

export default connect(mapStateToProps)(TipOutDrawer);
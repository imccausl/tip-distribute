import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import TipOutList from './TipOutList.jsx';

class TipOutDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Drawer:", this.props.drawerOpen);
    return (
      <div>
        <Drawer
          open={this.props.drawerOpen}
        >
          <Toolbar>
            <ToolbarTitle text="Previous Tipouts" />
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
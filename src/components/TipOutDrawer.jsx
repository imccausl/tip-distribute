import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import TipOutList from './TipOutList.jsx';

class TipOutDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = { openDrawer: true };
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.state.openDrawer}
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

export default TipOutDrawer;
import React, { Component } from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';
import StatsIcon from 'material-ui/svg-icons/editor/show-chart';
import Paper from 'material-ui/Paper';

class BottomBar extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
  }

  select(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    return (
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: '5' }}>
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Edit"
            icon={<EditIcon />}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Distribute"
            icon={<MoneyIcon />}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Statistics"
            icon={<StatsIcon />}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

export default BottomBar;
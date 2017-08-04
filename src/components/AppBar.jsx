import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="MenuItem" />
        <MenuItem primaryText="MenuItem2" />
        <MenuItem primaryText="MenuItem3" />
      </IconMenu>
    );
  }
}

const TipAppBar = () => (
  <AppBar
    ref="leftNav"
    title="Tip Out Generator"
    iconElementRight={<MainMenu />}
  />
);

export default TipAppBar;

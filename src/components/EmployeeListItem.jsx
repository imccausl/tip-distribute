import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import Employee from './Employee.jsx';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="Actions"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class EmployeeListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText={this.props.name}
          secondaryText={this.props.hours}
          onTouchTap={this.props.clicked}
        />
        <Divider inset={true} />
      </div>
    );
  }
}

export default EmployeeListItem;

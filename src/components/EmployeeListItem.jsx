import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';

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

    this.state.employee = { name, hours };
  }

  render() {
    return (
      <div>
        <ListItem
          rightIconButton={rightIconMenu}
          primaryText="Employee Name"
          secondaryText="Hours Worked"
        />
        <Divider inset={true} />
      </div>
    )
  }
}

export default EmployeeListItem;

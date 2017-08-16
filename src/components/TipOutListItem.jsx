import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import NumPeopleBadge from 'material-ui/Badge';
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

class TipOutListItem extends Component {
  render() {
    const people = (!this.props.employees) ? 0 : this.props.employees.length;
    const totalHours = (!this.props.employees) ? 0 : Math.floor(
      this.props.employees.map(emp => Number.parseFloat(emp.hours))
        .reduce((sum, curr) => sum + curr, 0),
    );

    return (
      <div>
        <ListItem
          primaryText={`Week Ending ${this.props.week}`}
          secondaryText={`$${this.props.cash} | Hours: ${totalHours}`}
          rightIcon={<NumPeopleBadge badgeContent={people} primary={true} />}
          onTouchTap={this.props.click}
        />
        <Divider inset={false} />
      </div>
    );
  }
}

export default TipOutListItem;

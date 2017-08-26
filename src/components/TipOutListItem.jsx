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
import parseDate from '../helpers/dateHelpers';

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
  static getNumOfPeople(people) {
    return (!people) ? 0 : Object.keys(people).length;
  }

  constructor(props) {
    super(props);

    this.state = {
      people: TipOutListItem.getNumOfPeople(this.props.people),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      people: TipOutListItem.getNumOfPeople(nextProps.people),
    });
  }

  render() {
    return (
      <div>
        <ListItem
          leftCheckbox={null}
          primaryText={`Week Ending ${parseDate(this.props.week)}`}
          secondaryText={`$${this.props.cash} | Hours: ${this.props.totalHours}`}
          secondaryTextLines={2}
          rightIcon={<NumPeopleBadge badgeContent={this.state.people} primary={true} />}
          onTouchTap={this.props.click}
        />
        <Divider inset={false} />
      </div>
    );
  }
}

export default TipOutListItem;

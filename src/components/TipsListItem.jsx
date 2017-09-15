import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import NewBadge from 'material-ui/Badge';
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

class TipsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tipMoney: this.props.hours * this.props.wage,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tipMoney: nextProps.hours * nextProps.wage,
    });
  }

  render() {
    return (
      <div>
        <ListItem
          leftCheckbox={null}
          primaryText={`Week Ending ${parseDate(this.props.week)}`}
          secondaryText={`$${Math.round(this.state.tipMoney)} for ${this.props.hours} hours`}
          secondaryTextLines={2}
          rightIcon={<NewBadge badgeContent="!" primary={true} />}
          onClick={this.props.click}
        />
        <Divider inset={false} />
      </div>
    );
  }
}

export default TipsListItem;

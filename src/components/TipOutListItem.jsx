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

class TipOutListItem extends Component {
  render() {
    const people = (!this.props.employees) ? 0 : this.props.employees.length;

    const NumOfPeople = () => {
      const style = {
        position: 'relative',
        borderRadius: '50%',
        color: 'black',
        backgroundColor: 'lightGrey',
        width: '30px',
        height: '30px',
        textAlign: 'center',
        margin: '5px',
        fontWeight: 'bold',
      };

      const spanStyle = {
        position: 'absolute',
        top: '6px',
        left: (people < 10) ? '10px' : '6px',
      };

      const styleAbsolute = {
        position: 'absolute',
        right: '20px',
      };

      return (
        <div style={styleAbsolute}>
          <div style={style}>
            <span style={spanStyle}>{people}</span>
          </div>
        </div>
      );
    };

    return (
      <div>
        <ListItem
          primaryText={`Week Ending ${this.props.week}`}
          secondaryText={`Tipout: $${this.props.cash} | Total Hours: XXX`}
          rightIcon={<NumOfPeople />}
          onTouchTap={this.props.click}
        />
        <Divider inset={true} />
      </div>
    );
  }
}

export default TipOutListItem;

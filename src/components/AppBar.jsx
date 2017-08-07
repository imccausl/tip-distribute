import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { showDrawer } from '../actions/drawerActions';
import addNewPerson from '../actions/addNewPersonToCurrentTipOut';

class TipAppBar extends Component {

  MainMenu() {
      return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem 
          primaryText="Add People to Tip Out..."
          leftIcon={<SvgIcon><ContentAdd /></SvgIcon>}
          onTouchTap={() => this.props.showAddPeopleDialog()}
        />
        <MenuItem primaryText="Edit Date and Cash..." />
         <Divider /> 
        <MenuItem primaryText="Distribute Tips" />
      </IconMenu>
      );
    }

    makeNewId() {
      const tempId = new Date();
      const parsedDate = Date.parse(tempId);

      // prevent unique key errors if button is clicked more than once a second
      const randomizer = Math.floor(Math.random() * parsedDate);
      return parsedDate + randomizer;
    }

    addButton() {
      return (
        <IconButton
          toolTip="Add new person to tip out"
          onTouchTap={() => this.props.addNewPerson({ 
            id: this.makeNewId(), name: 'New Person', hours: '0' })}
        >
          <SvgIcon><ContentAdd /></SvgIcon>
        </IconButton>
      )
    }

  render() {
    let headerText = "";
    if (!this.props.tipOut) 
      headerText = "No Tipout Selected";
    else
      headerText = 'Week: ' + this.props.tipOut.weekEnding;
    console.log("AppBAR:", this.props.tipOut);
    return (
      <AppBar
        title={headerText}
        iconElementRight={this.addButton()}
        onLeftIconButtonTouchTap={() => this.props.showDrawer()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    tipOut: state.activeTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showDrawer, addNewPerson }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipAppBar);

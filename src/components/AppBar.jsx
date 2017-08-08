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
import { showModal } from '../actions/modalActions';
import DistributionReport from './DistributionReport.jsx';

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
        <MenuItem primaryText="Distribute Tips" 
          onTouchTap={this.props.showModal}
        />
      </IconMenu>
      );
    }

  render() {
    let headerText = "";
    if (!this.props.tipOut) 
      headerText = "No Tipout Selected";
    else
      headerText = 'Week: ' + this.props.tipOut.weekEnding;
    console.log("AppBAR:", this.props.tipOut);
    return (
      <div>
        <AppBar
          title={headerText}
          iconElementRight={this.MainMenu()}
          onLeftIconButtonTouchTap={() => this.props.showDrawer()}
        />
      <DistributionReport />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    open: state.showModal,
    tipOut: state.activeTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showDrawer, showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipAppBar);

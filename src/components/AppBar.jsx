import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { showDrawer } from '../actions/drawerActions';

const MainMenu = () => (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Add People to Tip Out..." />
        <MenuItem primaryText="Edit Date and Cash..." />
         <Divider /> 
        <MenuItem primaryText="Distribute Tips" />
      </IconMenu>
    );

class TipAppBar extends Component {
  render() {
    let headerText = "";
    if (!this.props.tipOut) 
      headerText = "No Tipout Selected";
    else
      headerText = this.props.tipOut.weekEnding;

    return (
      <AppBar
        title={headerText}
        iconElementRight={<MainMenu />}
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
  return bindActionCreators({ showDrawer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipAppBar);

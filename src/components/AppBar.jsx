import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import { showDrawer } from '../actions/drawerActions';
import showView from '../actions/viewAction';

class Login extends Component {  
  render() {
    return (
      <FlatButton label="Login" />
    );
  }
}

class MainBar extends Component {
  render() {
    const Logged = () => (
      <IconMenu
        iconButtonElement={<IconButton style={{ padding: '0' }}><Avatar>P</Avatar></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Profile..."
          onTouchTap={() => this.props.showView('SHOW_USER_PROFILE', null)}
        />
        <Divider />
        <MenuItem
          primaryText="Users & Permissions..."
        />
        <MenuItem
          primaryText="Stores..."
        />
        <Divider />
        <MenuItem primaryText="Sign Out"
          onTouchTap={() => this.props.firebase.logout()}
        />
      </IconMenu>
    );
    
    return (
      <div style={{ position: 'fixed', zIndex: 3, width: '100%', top: 0, left: 0 }}>
        <AppBar
          title={`${((this.props.auth.isEmpty && this.props.auth.isLoaded) || this.props.profile.name === undefined) ? 'Tip Management' : `${this.props.profile.name}`}`}
          onLeftIconButtonTouchTap={this.props.showDrawer}
          iconElementRight={(!this.props.auth.isEmpty && this.props.auth.isLoaded) ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showDrawer: state.showDrawer,
    view: state.activeView,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showDrawer, showView }, dispatch);
}

export default firebaseConnect([])(connect(mapStateToProps, mapDispatchToProps)(MainBar));

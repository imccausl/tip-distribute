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
import GenericProfileIcon from 'material-ui/svg-icons/action/account-circle';
import { showDrawer } from '../actions/drawerActions';
import showView from '../actions/viewAction';

const Login = () => <FlatButton label="Login" />;

class MainBar extends Component {
  render() {
    const superUserFunctions = () => {
      if (this.props.profile.superuser) {
        return (
          <div>
            <Divider />
            <MenuItem primaryText="Users & Permissions..." />
            <MenuItem
              primaryText="Stores..."
              onClick={() => this.props.showView('SHOW_EDIT_STORES', null)}
            />
          </div>
        );
      }

      return null;
    };
    const Logged = () => (
      <IconMenu
        iconButtonElement={
          <IconButton style={{ padding: '0' }}>
            <Avatar>
              <GenericProfileIcon />
            </Avatar>
          </IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Profile"
          onClick={() => this.props.showView('SHOW_USER_PROFILE', null)}
        />
        {superUserFunctions()}
        <MenuItem
          primaryText="Edit & Add People"
          onClick={() => this.props.showView('SHOW_EDIT_PEOPLE', 2, this.props.view.payload.key)}
        />
        <Divider />
        <MenuItem primaryText="Sign Out" onClick={() => this.props.firebase.logout()} />
      </IconMenu>
    );

    return (
      <div style={{ position: 'fixed', zIndex: 3, width: '100%', top: 0, left: 0 }}>
        <AppBar
          title={`${(this.props.auth.isEmpty && this.props.auth.isLoaded) ||
          this.props.profile.name === undefined
            ? 'Tip Management'
            : `${this.props.profile.name}`}`}
          onLeftIconButtonTouchTap={this.props.showDrawer}
          iconElementRight={
            !this.props.auth.isEmpty && this.props.auth.isLoaded ? <Logged /> : <Login />
          }
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

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(MainBar));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pathToJS, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import { showDrawer } from '../actions/drawerActions';

class Login extends Component {  
  render() {
    return (
      <FlatButton label="Login"
      />
    );
  }
}

class MainBar extends Component {
  render() {
    const Logged = () => (
      <IconMenu
        iconButtonElement={<IconButton><MoreIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Sign out"
          onTouchTap={() => this.props.firebase.logout()}
        />
      </IconMenu>
    );

    return (
      <div style={{ position: 'fixed', zIndex: 3, width: '100%', top: 0, left: 0 }}>
        <AppBar
          title="Tip Management"
          onLeftIconButtonTouchTap={this.props.showDrawer}
          iconElementRight={(!isEmpty(this.props.auth)) ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showDrawer: state.showDrawer,
    auth: pathToJS(state.firebase, 'auth'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showDrawer }, dispatch);
}

export default firebaseConnect()(connect(mapStateToProps, mapDispatchToProps)(MainBar));

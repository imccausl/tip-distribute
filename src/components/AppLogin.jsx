import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './LoginModal.jsx';
import UserIsNotAuthenticated from './UserNotAuthenticated.jsx';

@UserIsNotAuthenticated
class AppLogin extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Login />
      </MuiThemeProvider>
    );
  }
}

export default AppLogin;

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './LoginModal.jsx';

const AppLogin = () => (
  <MuiThemeProvider>
    <Login />
  </MuiThemeProvider>
);

export default AppLogin;

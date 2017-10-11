import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LoggedIn from './LoggedIn';
import UserIsAuthenticated from './UserIsAuthenticated';

@UserIsAuthenticated
class AppMain extends Component {
  render() {
    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <MuiThemeProvider>
          <LoggedIn />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(AppMain);

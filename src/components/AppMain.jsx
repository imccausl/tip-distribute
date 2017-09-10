import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ViewArea from './ViewArea.jsx';
import AppBar from './AppBar.jsx';
import BottomBar from './BottomBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';
import UserIsAuthenticated from './UserIsAuthenticated.jsx';

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {

}

@UserIsAuthenticated
@firebaseConnect([])
@connect(mapStateToProps, mapDispatchToProps)
class AppMain extends Component {
  render() {
    return (
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <MuiThemeProvider>
          <TipOutDrawer />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <ViewArea />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <BottomBar />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(AppMain);

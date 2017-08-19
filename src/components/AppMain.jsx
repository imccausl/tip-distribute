import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ViewArea from './ViewArea.jsx';
import AppBar from './AppBar.jsx';
import BottomBar from './BottomBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';

const AppMain = () => (
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    <MuiThemeProvider>
      <TipOutDrawer />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <AppBar />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <ViewArea />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <BottomBar />
    </MuiThemeProvider>
  </div>
);

export default AppMain;

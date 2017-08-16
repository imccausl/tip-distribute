import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import EmployeeList from './EmployeeList.jsx';
import AppBar from './AppBar.jsx';
import BottomBar from './BottomBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';

const App = () => (
  <div style={{ position: 'relative' }}>
    <MuiThemeProvider>
      <TipOutDrawer />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <AppBar />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <EmployeeList />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <BottomBar />
    </MuiThemeProvider>
  </div>
);

export default App;

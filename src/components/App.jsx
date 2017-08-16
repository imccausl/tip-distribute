import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import EmployeeList from './EmployeeList.jsx';
import AppBar from './AppBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';

const App = () => (
  <div style={{ maxWidth: '500px', margin: '0 auto' }}>
    <MuiThemeProvider>
      <TipOutDrawer />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <AppBar />
    </MuiThemeProvider>
    <MuiThemeProvider>
      <EmployeeList />
    </MuiThemeProvider>
  </div>
);

export default App;
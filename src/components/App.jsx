import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmployeeList from './EmployeeList.jsx';
import AppBar from './AppBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';

const App = () => (
  <div>
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

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmployeeList from './EmployeeList.jsx';

const App = () => (
  <MuiThemeProvider>
    <EmployeeList />
  </MuiThemeProvider>
)

export default App;

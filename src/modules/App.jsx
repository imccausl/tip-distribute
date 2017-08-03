import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Employee from './Employee.jsx';
import Distribution from './Distribution.jsx';
import EmployeeList from './EmployeeList.jsx';

const App = () => (
  <div>
    <MuiThemeProvider>
      <Employee />
    </MuiThemeProvider>

    <MuiThemeProvider>
      <Distribution />
    </MuiThemeProvider>

    <MuiThemeProvider>
      <EmployeeList />
    </MuiThemeProvider>
  </div>
)

export default App;

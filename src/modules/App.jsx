import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Employee from './Employee.jsx';

const App = () => (
  <MuiThemeProvider>
    <Employee />
  </MuiThemeProvider>
)

export default App;

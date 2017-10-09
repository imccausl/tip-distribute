import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppMain from './AppMain';
import AppLogin from './AppLogin';
import AppBar from './AppBar';

const RouteLayout = () => (
  <main>
    <Route path="/" exact component={AppMain} />
    <Route path="/login" component={AppLogin} />
  </main>
);

const App = () => (
  <div>
    <MuiThemeProvider>
      <AppBar />
    </MuiThemeProvider>
    <Router>
      <RouteLayout />
    </Router>
  </div>
);

export default App;

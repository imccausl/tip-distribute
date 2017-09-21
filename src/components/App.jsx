import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppMain from './AppMain.jsx';
import AppLogin from './AppLogin.jsx';
import AppBar from './AppBar.jsx';

const RouteLayout = () => (
  <main>
    <Route path="/" exact component={AppMain} />
    <Route path="/login" component={AppLogin} />
  </main>
);

const App = () => (
  <div style={{ maxWidth: '700px', margin: '0 auto' }}>
    <MuiThemeProvider>
      <AppBar />
    </MuiThemeProvider>
    <Router>
      <RouteLayout />
    </Router>
  </div>
);

export default App;

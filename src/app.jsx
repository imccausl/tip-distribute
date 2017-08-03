import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

injectTapEventPlugin();

const Menus = () => (
  <div>
    <AppBar title="Tip Distribution" showMenuIconButton={false} />
    <FloatingActionButton />
  </div>
);

const Main = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Menus />
  </MuiThemeProvider>
);

ReactDOM.render(<Main />, document.getElementById('react-app'));

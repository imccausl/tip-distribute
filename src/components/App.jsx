import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmployeeList from './EmployeeList.jsx';
import rootReducer from '../reducers/index';
import AppBar from './AppBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // debugger
);

const App = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;

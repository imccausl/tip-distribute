import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import EmployeeList from './EmployeeList.jsx';
import rootReducer from '../reducers/index';
import Employee from './Employee.jsx';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <div>
    <MuiThemeProvider>
      <EmployeeList />
    </MuiThemeProvider>
    </div>
  </Provider>
)

export default App;

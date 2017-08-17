import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import App from './components/App.jsx';
import rootReducer from './reducers/index';
import firebaseConfig from './config/firebaseConfig';

injectTapEventPlugin();

const config = {
  userProfile: 'users',
  enableLogging: false,
};

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config),
)(createStore);

const store = createStoreWithFirebase(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // debugger
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'));

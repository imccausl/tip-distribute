import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import App from './components/App.jsx';
import rootReducer from './reducers/index';
import firebaseConfig from './config/firebaseConfig';

const config = {
  userProfile: 'users',
  enableLogging: false,
};

firebase.initializeApp(firebaseConfig);
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // debugger
  compose(
    reactReduxFirebase(firebase, config),
  ),
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,

  document.getElementById('root'));

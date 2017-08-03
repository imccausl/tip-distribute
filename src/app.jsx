import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));

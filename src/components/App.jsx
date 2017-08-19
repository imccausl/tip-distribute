import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AppMain from './AppMain.jsx';
import AppLogin from './AppLogin.jsx';

const RouteLayout = () => (
  <main>
    <Route path="/" exact component={AppMain} />
    <Route path="/login" component={AppLogin} />
  </main>
);

const App = () => (
  <BrowserRouter>
    <RouteLayout />
  </BrowserRouter>
);

export default App;

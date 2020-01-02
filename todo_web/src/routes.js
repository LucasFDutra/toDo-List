import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/main/index';
import Dashboard from './pages/dashboard/index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route exact path='/:username' component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

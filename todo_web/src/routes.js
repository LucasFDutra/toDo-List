import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './pages/main/index'
import Login from './pages/login/index';
import Dashboard from './pages/dashboard/index';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Main} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

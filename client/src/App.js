import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';
import Lists from './pages/Lists/Lists';
import ListDetail from './pages/ListDetail/ListDetail';
import Authentication from './components/Authentication/Authentication';

export default () => {
  return (
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Authentication>
            <Route path="/login" component={Login} />
            <Route exact path="/users/:userId/lists" component={Lists} />
            <Route path="/users/:userId/lists/:listId" component={ListDetail} />
          </Authentication>
        </Switch>
  )
}
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SiginUp from '~/pages/SiginUp';
import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard/index';
import Profile from '~/pages/Profile/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" exact component={SiginUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}

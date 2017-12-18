import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AppLogic from './components/AppLogic';

const App = () => (
  <HashRouter>
    <Switch>
      <Route
        path="/article/:articleId"
        exact={true}
        component={AppLogic}
      />
      <Route path="/" component={AppLogic} />
    </Switch>
  </HashRouter>
);

render(<App />, document.getElementById('root'));

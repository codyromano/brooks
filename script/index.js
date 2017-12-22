import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AppLogic from './components/AppLogic';
import TableOfContents from './components/TableOfContents';
import withLibraryModel from './data/models/withLibraryModel';

const AppLogicWithProps = withLibraryModel(AppLogic);

const App = () => (
  <HashRouter>
    <Switch>
      <Route
        path="/article/:articleId"
        exact={true}
        component={AppLogicWithProps}
      />
      <Route
        path="/table-of-contents"
        exact={true}
        component={TableOfContents}
      />
      <Route path="/" component={AppLogicWithProps} />
    </Switch>
  </HashRouter>
);

render(<App />, document.getElementById('root'));

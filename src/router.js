import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import WeatherPage from './routes/WeatherPage.jsx';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/weather" exact component={WeatherPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

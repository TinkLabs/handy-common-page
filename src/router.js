import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import WeatherPage from './routes/WeatherPage.jsx';
import JR from './routes/JR.jsx';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" >
          <Switch>
            <Route path="/weather"  component={WeatherPage} />
            <Route path="/campaign/suica"  component={JR} />
          </Switch>
        </Route>
    </Router>
  );
}

export default RouterConfig;

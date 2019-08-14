import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import WeatherPage from './routes/WeatherPage.jsx';
import CurrencyPage from './routes/CurrencyPage.jsx';
import JR from './routes/NewJR/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" >
          <Switch>
            <Route path="/weather"  component={WeatherPage} />
            <Route path="/currency"  component={CurrencyPage} />
            <Route path="/campaign/suica"  component={JR} />
          </Switch>
        </Route>
    </Router>
  );
}

export default RouterConfig;

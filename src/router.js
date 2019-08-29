import React from "react";
import { Router, Route, Switch } from "dva/router";
import dynamic from "dva/dynamic";

// import WeatherPage from './routes/WeatherPage.jsx';
// import CurrencyPage from './routes/CurrencyPage.jsx';
// import JR from './routes/NewJR/index';

function RouterConfig({ history, app }) {
  const WeatherPage = dynamic({
    app,
    models: () => [import("./models/weather")],
    component: () => import("./routes/WeatherPage"),
  });
  const CurrencyPage = dynamic({
    app,
    models: () => [import("./models/currency")],
    component: () => import("./routes/CurrencyPage"),
  });
  const JR = dynamic({
    app,
    models: () => [import("./models/jr")],
    component: () => import("./routes/NewJR/index"),
  });
  return (
    <Router history={history}>
      <Route path="/">
        <Switch>
          <Route path="/weather" component={WeatherPage} />
          <Route path="/currency" component={CurrencyPage} />
          <Route path="/campaign/suica" component={JR} />
        </Switch>
      </Route>
    </Router>
  );
}

export default RouterConfig;

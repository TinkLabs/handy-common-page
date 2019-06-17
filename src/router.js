import React from 'react';
import { Router, Route, Switch,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import WeatherPage from './routes/WeatherPage.jsx';
import JR from './routes/JR.jsx';
import Campaign from './routes/Campaign.jsx';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" >
          <Switch>
            <Route path="/weather"  component={WeatherPage} />
            <Route path="/campaign"  component={JR} />
          </Switch>
        </Route>
    </Router>
  );
}
/* 
访问http://localhost:8000/#/campaign/one 可以成功
想去掉井号 所以加上 
const app = dva({
    history: createBrowserHistory(),
 });
访问http://localhost:8000/campaign/one 失败 空白页

但是 weather都成功
*/


export default RouterConfig;

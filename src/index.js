import dva from 'dva';
import './index.css';
import { createBrowserHistory } from 'history';
import { browserHistory } from 'react-router'
import { createBrowserHistory as createHistory } from 'history';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

app.model(require('./models/weather').default);

app.model(require('./models/jr').default);

// 5. Start
app.start('#root');

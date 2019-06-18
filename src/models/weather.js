import w from './mock.js';
// import {fetchWeather} from '../services/services';
import * as srv from '../services/services';
import {getBarcode} from '../utils/common';

export default {
    namespace: 'weather',
    state: {
      temptype:1,
      wdata:{
        "location": "",
        "current": {
          "day": "Today",
          "date": "",
          "low": 0,
          "high": 0,
          "text": "",
          "code": 44,
          "temp_f": 0,
          "temp_c": 0,
          "high_c": "0",
          "high_f": 0,
          "low_c": "0",
          "low_f": 0,
          "icon": ""
        },
        "forecast": [],
        "attribution_link": "webview:https://www.yahoo.com/?ilc=401",
        "background_image": "local:weather_condition_bg_3",
        "default_temperature_unit": "c",
        "greeting": "Good Morning!",
        "barcode": "355655090012297",
        "zone": "4"
      },
      barcode:0,
    },
    effects: {
      * fetchWeather({payload: {barcode}}, {call, put}) {  // eslint-disable-line
        const response = yield call(srv.fetchWeather, barcode);
        let result = response.data;
        if (result.error){
          yield put({type: 'save'});
        }else{
          yield put({
            type: 'save',
            payload:{
              wdata:result
            }
          });
        }
      },
    },
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },

      changeTempType(state, action) {
        return { ...state, ...action.payload };
      },

      initData(state, {}) {
        let wdata = {wdata:w};
        return { ...state, ...wdata };
      },
    },

    subscriptions: {
      //监听地址，如果地址含有weather则跳转到登陆页
      setup({ dispatch, history }) {
        history.listen(location => {
          if (location.pathname.includes('weather')) {
            dispatch({
              type: 'fetchWeather',
              payload:{
                barcode:getBarcode()
              }
            })
          }
        });
      },
    },
  };

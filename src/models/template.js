import w from './mock.js';
// import {fetchWeather} from '../services/services';
import * as srv from '../services/services';
import {getBarcode} from '../utils/common';

export default {
    namespace: 'template',
    state: {
      num:0,
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
    },

    subscriptions: {
      //监听地址，如果地址含有weather则跳转到登陆页
      setup({ dispatch, history }) {
        history.listen(location => {
          if (location.pathname.includes('template')) {
            console.log("template")
          }
        });
      },
    },
  };
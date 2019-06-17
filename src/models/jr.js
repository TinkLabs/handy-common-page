import w from './mock.js';
// import {fetchWeather} from '../services/services';
import * as srv from '../services/services';
import {getBarcode} from '../utils/common';

export default {
    namespace: 'jr',
    state: {
      num:0,
      barcode:0,
      success:true,
      suica:"",
      wrong:false,
    },
    effects: {
      * validcode({payload: {suica}}, {call, put}) {  // eslint-disable-line
        let barcode = getBarcode();
        const response = yield call(srv.suicaLog, barcode, suica);
        let result = response.data;
        let success = false;
        let nextsuica = suica;
        if (result.success){
            success = true;
            nextsuica = ""
        }
        yield put({
            type: 'save',
            payload:{
                success,
                num:1,
                nextsuica,
                wrong:false
            }
          });
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
          if (location.pathname.includes('suica')) {
            console.log("jr")
            document.title='Buy Welcome Suica Get Premium Goods';
          }
        });
      },
    },
  };
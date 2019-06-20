import * as srv from '../services/services';
import {getBarcode,getDeviceUserID} from '../utils/common';


export default {
    namespace: 'jr',
    state: {
      num:0,
      barcode:0,
      success:true,
      suica:"",
      wrong:false,
      btntext:"OK",
    },
    effects: {
      * validcode({payload: {suica}}, {call, put}) {  // eslint-disable-line
        let barcode = getBarcode();
        let deviceuserid = getDeviceUserID();
        const response = yield call(srv.suicaLog, barcode, suica, deviceuserid);
        if (response.error){
          console.log("err",response.error)
        }
        let result = response.data;
        let success = false;
        let nextsuica = suica;
        if (result && result.success){
            success = true;
            nextsuica = "";
        }
        yield put({
            type: 'save',
            payload:{
                success,
                num:1,
                nextsuica,
                wrong:false,
                btntext:"OK"
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
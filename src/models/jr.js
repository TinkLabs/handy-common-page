import * as srv from "../services/services";
import { getBarcode, getDeviceUserID } from "../utils/env";
import constants from "../utils/constants";

export default {
  // this namespce is used for displatch
  namespace: "jr",
  state: {
    num: 0,
    barcode: 0,
    success: true,
    suica: "",
    suica0: "",
    suica1: "",
    suica2: "",
    suica3: "",
    wrong: false,
    btntext: "Submit",
    numberWrong: false,
    letterWrong: false,
    showLangList: false,
    showStationModal: false,
    title: constants.title,
    htmlLang: constants.htmlLang,
  },
  effects: {
    *validcode(
      {
        payload: { suica },
      },
      { call, put }
    ) {
      // eslint-disable-line
      let barcode = getBarcode();
      let deviceuserid = getDeviceUserID();
      try {
        const response = yield call(srv.suicaLog, barcode, suica, deviceuserid);
        let result = response.data;
        let success = false;
        let nextsuica = suica;
        if (result && result.success) {
          success = true;
          nextsuica = "";
        }
        yield put({
          type: "save",
          payload: {
            success,
            num: 1,
            nextsuica,
            wrong: false,
            btntext: "Submit",
          },
        });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch (e) {
        let success = false;
        yield put({
          type: "save",
          payload: {
            success,
            num: 1,
            wrong: false,
            btntext: "Submit",
          },
        });
      }
      // if (response.error) {
      //   console.log("err", response.error);
      // } else {
      // }
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    controlLangList(state, action) {
      return {
        ...state,
        ...{
          showLangList: action.showLangList,
          title: action.title,
          htmlLang: action.htmlLang,
        },
      };
    },
    controlStationModal(state, action) {
      return { ...state, ...{ showStationModal: action.showStationModal } };
    },
  },

  subscriptions: {
    //监听地址，如果地址含有weather则跳转到登陆页
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname.includes("suica")) {
          // document.title = "Buy Welcome Suica Get Premium Goods";
        }
      });
    },
  },
};

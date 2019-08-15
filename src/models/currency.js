import * as srv from "../services/services";
let currencyDate = "";
let currencKeyPrefix = "common-currency:";
function currencyKey(val) {
  return currencKeyPrefix + val;
}
export default {
  namespace: "currency",
  state: {
    temptype: 1,
    lastupdate: "",
    base: "USD",
    quote: "HKD",
    baseval: "",
    quoteval: "",
    rates: {},
    barcode: 0,
  },
  effects: {
    *fetchCurrency(
      {
        payload: { currency },
      },
      { call, put }
    ) {
      // eslint-disable-line
      if (currencyDate !== "") {
        let cacheRate = localStorage.getItem(currencyKey(currency));
        if (cacheRate) {
          try {
            let obj = JSON.parse(cacheRate);
            if (obj.date === currencyDate && obj.rates !== {}) {
              yield put({
                type: "saveRate",
                payload: {
                  item: obj,
                  lastupdate: currencyDate,
                },
              });
              return;
            }
          } catch (e) {
            console.log("try e", e);
          }
        }
        currencyDate = "";
      }

      const response = yield call(srv.fetchCurrency, currency);
      if (response.status !== 200) {
        console.log("status", response.status);
        return;
      }

      let array = response.data.data || [];
      if (array.length === 0) {
        console.log("array:");
        return;
      }
      let item = response.data.data[0];

      if (currencyDate === "") {
        localStorage.setItem(currencyKey(currency), JSON.stringify(item));
        currencyDate = item.date;
      }

      yield put({
        type: "saveRate",
        payload: {
          item,
          lastupdate: currencyDate,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      // console.log(state.rates)
      return { ...state, ...action.payload };
    },

    saveRate(state, action) {
      let rates = state.rates;
      let item = action.payload.item;
      rates[item.base] = item.rates;

      // quoteval
      let quoteval = "";
      if (rates[state.base] && state.baseval !== "") {
        let rq = rates[state.base][state.quote];
        quoteval = (rq * state.baseval).toFixed(4);
      }

      // // basevalue
      // let baseval = "";
      // if (rates[state.quote] && state.quoteval !== ""){
      //     let rb = rates[state.quote][state.base];
      //     baseval = rb * state.quoteval;
      // }

      let lastupdate = action.payload.lastupdate;
      // console.log(".......",lastupdate)
      return { ...state, rates, quoteval, lastupdate };
    },

    savebase(
      state,
      {
        payload: { baseval },
      }
    ) {
      let rates = state.rates;
      let r = rates[state.base][state.quote];
      let quoteval = (r * baseval).toFixed(4);
      return { ...state, baseval, quoteval };
    },

    savequote(
      state,
      {
        payload: { quoteval },
      }
    ) {
      let rates = state.rates;
      let r = rates[state.quote][state.base];
      let baseval = (r * quoteval).toFixed(4);
      return { ...state, baseval, quoteval };
    },
  },

  subscriptions: {
    //监听地址，如果地址含有currency则跳转到登陆页
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log("history", history);
        if (location.pathname.includes("currency")) {
          document.title = "currency";
          dispatch({
            type: "fetchCurrency",
            payload: { currency: "USD" },
          });

          dispatch({
            type: "fetchCurrency",
            payload: { currency: "HKD" },
          });
        }
      });
    },
  },
};

import * as srv from '../services/services';

export default {
    namespace: 'currency',
    state: {
        temptype: 1,
        lastupdate: "2019-06-18",
        base: "USD",
        quote:"HKD",
        rates: {},
        barcode: 0,
    },
    effects: {
        * fetchCurrency({ payload: { base } }, { call, put }) { // eslint-disable-line
            const response = yield call(srv.fetchCurrency, base);
            let result = response.data;
            if (result.error) {
                yield put({ type: 'save' });
            } else {
                yield put({
                    type: 'save',
                    payload: {
                        data: result
                    }
                });
            }
        },
    },
    reducers: {
        save(state, action) {
            return {...state, ...action.payload };
        },
    },

    subscriptions: {
        //监听地址，如果地址含有currency则跳转到登陆页
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname.includes('currency')) {
                    // i
                }
            });
        },
    },
};
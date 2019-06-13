import w from './mock.js';

export default {
    namespace: 'weather',
    state: {
      temptype:1,
      daytime:"Today, Tuesday, May 14",
      location:"Hong Kong",
      wdata:{},
    },
    reducers: {
      changeTempType(state, action) {
        return { ...state, ...action.payload };
      },

      initData(state, {}) {
        let wdata = {wdata:w};
        return { ...state, ...wdata };
      },
    },
  };
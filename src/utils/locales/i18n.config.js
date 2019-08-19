export default {
  // load: "currentOnly",
  // lng: navigator.language || navigator.userLanguage,
  // preset
  lng: "ja_JP",
  fallbackLng: "ja_JP",
  // lngs: [
  //   'en_US',
  //   'ja_JP',
  //   'zh_HK',
  //   'zh_CN',
  // ],
  // ns: ['translation'], // has to match json file name and resource object eg: "en-US": {translation: en_US}"
  // nsSeparator: false,
  // keySeparator: false,
  interpolation: {
    escapeValue: false, // not needed for react!!
    // formatSeparator: ","
  },
  // detection: {
  //   order: ['querystring' /*'session', 'path', 'session', 'querystring1', */, 'cookie'],
  //   // lookupQuerystring1: 'locale',
  //   lookupQuerystring: 'lng'
  // },
  /*全局解决加载的时候显示原英文的问题*/
  // react: {
  //   wait: true
  // }
};

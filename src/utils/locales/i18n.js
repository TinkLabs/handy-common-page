import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import config from './i18n.config';

import en_US from '../../assets/language/en_US.json';
import ja_JP from '../../assets/language/ja_JP.json';
import zh_CN from '../../assets/language/zh_CN.json';
import zh_HK from '../../assets/language/zh_HK.json';

const options = {
    ...config,
    // debug: true,
    resources: {
        "en_US": { translation: en_US },
        "ja_JP": { translation: ja_JP },
        "zh_CN": { translation: zh_CN },
        "zh_HK": { translation: zh_HK },
    },
    // detection: detectorConfig,

}

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    // .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init(options);

export default i18n;

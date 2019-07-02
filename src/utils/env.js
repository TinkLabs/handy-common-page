// 根据不同环境设置不同域名
let B2CHost = 'https://b2c-gateway.hi.com';
let hotelIdHost = 'https://handy-resources-api.handy.travel';
let CMSHost = 'https://staging.handy.travel';
let adsHost = 'https://b2c-ads.hi.com';
let AdCurrencyPath = `/21623654641/Test/Currency`;
let AdWeatherPath = `/21623654641/Test/Weather`;
let backurl = `https://homepage-dev.handytravel.tech/index.html#/home`;

switch (process.env.APP_ENV) {
    case 'dev':
        B2CHost = 'https://b2c-gateway-dev.handytravel.tech';
        hotelIdHost = 'https://handy-resources-api-dev.handytravel.tech';
        CMSHost = 'https://staging.handy.travel';
        adsHost = 'https://ads-dev.handytravel.tech';
        backurl = `https://homepage-dev.handytravel.tech/index.html#/home`;
        break;
    case 'uat':
        B2CHost = 'https://b2c-gateway-uat.handytravel.tech';
        hotelIdHost = 'https://handy-resources-api-uat.handytravel.tech';
        CMSHost = 'https://uat.handy.travel';
        adsHost = 'https://ads-uat.handytravel.tech';
        AdCurrencyPath = `/21623654641/UAT/Currency`;
        AdWeatherPath = `/21623654641/UAT/Weather`;
        backurl = `https://homepage-uat.handytravel.tech`;
        break;
    case 'prod':
        B2CHost = 'https://b2c-gateway.hi.com';
        hotelIdHost = 'https://handy-resources-api.handy.travel';
        CMSHost = 'https://hk.handy.travel';
        adsHost = 'https://b2c-ads.hi.com';
        AdCurrencyPath = `/21623654641/Tinklabs/Currency`;
        AdWeatherPath = `/21623654641/Tinklabs/Weather`;
        backurl = `https://b2c-homepage.hi.com/`;
        break;
    default:
        // staging
        B2CHost = 'https://b2c-gateway-staging.handytravel.tech';
        hotelIdHost = 'https://handy-resources-api-staging.handytravel.tech';
        CMSHost = 'https://staging.handy.travel';
        adsHost = 'https://ads-staging.handytravel.tech';
        backurl = `https://homepage-staging.handytravel.tech/index.html#/home`;
}

let backtohp = () => {
    const isAndroid = typeof window.Android !== 'undefined'
    if (isAndroid) {
        window.location.href = `homewebview:${backurl}`
    } else {
        window.location.href = `${backurl}`
    }
}

let globalProperties = {};
let barcode = '355655090012297';
let device_user_id = 0;
let conslog = '';
var isAndroid = typeof window.Android !== 'undefined'
let adKeyValue = void 0;

let initLocalConfig = () => {
    console.log("init config..")
    if (isAndroid && window.Android && window.Android.getGlobalProperties) {
        console.log("in android system")
        globalProperties = JSON.parse(window.Android.getGlobalProperties())
        barcode = globalProperties.imei
        device_user_id = globalProperties.device_user_id || 0
        conslog = window.Android.getGlobalProperties();
    } else {
        console.log("not in android system")
    }
}
initLocalConfig()

let getBarcode = () => {
    console.log("properties:", conslog)
    return barcode;
}

let getDeviceUserID = () => {
    return device_user_id;
}

let getGlobalProperties = () => {
    return globalProperties;
}

let IsAndroid = () => {
    return (typeof window.Android !== 'undefined')
}

let getCompaignId = () => {
    return window.Android.getCampaignId()
}

let getAdKeyValue = () => {
    return adKeyValue
}

let setAdKeyValue = (val) => {
    adKeyValue = val;
}

export {
    initLocalConfig,
    getBarcode,
    getDeviceUserID,
    getGlobalProperties,
    IsAndroid,
    getCompaignId,
    getAdKeyValue,
    setAdKeyValue,
    backtohp,
    B2CHost,
    hotelIdHost,
    CMSHost,
    adsHost,
    AdCurrencyPath,
    AdWeatherPath,
    backurl
}
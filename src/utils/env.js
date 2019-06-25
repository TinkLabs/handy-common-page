// 根据不同环境设置不同域名
let B2CHost = 'https://b2c-gateway.hi.com';
let hotelIdHost = 'https://handy-resources-api.handy.travel';
let CMSHost = 'https://staging.handy.travel';
let adsHost = 'https://b2c-ads.hi.com';

let AdCurrencyPath = `/21623654641/Test/Currency`
let AdWeatherPath = `/21623654641/Test/Weather`

switch (process.env.APP_ENV) {
    case 'dev':
        B2CHost = 'https://b2c-gateway-dev.handytravel.tech';
        hotelIdHost = 'https://handy-resources-api-dev.handytravel.tech';
        CMSHost = 'https://staging.handy.travel';
        adsHost = 'https://ads-dev.handytravel.tech';

        break;
    case 'uat':
        B2CHost = 'https://b2c-gateway-uat.handytravel.tech';
        hotelIdHost = 'https://handy-resources-api-uat.handytravel.tech';
        CMSHost = 'https://uat.handy.travel';
        adsHost = 'https://ads-uat.handytravel.tech';
        AdCurrencyPath = `/21623654641/UAT/Currency`
        AdWeatherPath = `/21623654641/UAT/Weather`
        break;
    case 'prod':
        B2CHost = 'https://b2c-gateway.hi.com';
        hotelIdHost = 'https://handy-resources-api.handy.travel';
        CMSHost = 'https://hk.handy.travel';
        adsHost = 'https://b2c-ads.hi.com';
        AdCurrencyPath = `/21623654641/Tinklabs/Currency`
        AdWeatherPath = `/21623654641/Tinklabs/Weather`
        break;
    default:
        // staging
        B2CHost = 'https://b2c-gateway-staging.handytravel.tech';
        hotelIdHost = 'https://handy-resources-api-staging.handytravel.tech';
        CMSHost = 'https://staging.handy.travel';
        adsHost = 'https://ads-staging.handytravel.tech';
}

export { B2CHost, hotelIdHost, CMSHost, adsHost, AdCurrencyPath, AdWeatherPath};
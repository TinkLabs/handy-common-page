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

export { B2CHost, hotelIdHost, CMSHost, adsHost, AdCurrencyPath, AdWeatherPath, backurl};
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

function backtohp(){
    const isAndroid = typeof window.Android !== 'undefined'
    if (isAndroid) {
      window.location.href = `homewebview:${backurl}`
    } else {
      window.location.href = `${backurl}`
    }
}

let adKeyValue = void 0;
let barcode = 0;
// get ad key value
async function getAdKeyValueFn() {
    return {
      hotel_id: '6312',
      campaign_id: '0',
      country: 100,
      lang: 'zh_cn',
    };
    // if (!adKeyValue) {
    //   const urlPar = {
    //     _barcode: barcode,
    //   };
    //   try {
    //     const result = await request.getCMSAdKeyValueFn(urlPar);
    //     // only call this api once
    //     adKeyValue = result.data.key_value;
    //     if (isAndroid) {
    //       adKeyValue.campaign_id = window.Android.getCampaignId();
    //     }
    //     if (!adKeyValue.campaign_id) {
    //       adKeyValue.campaign_id = '0';
    //     }
    //     return adKeyValue;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // } else {
    //   // campaign id reload
    //   if (isAndroid) {
    //     adKeyValue.campaign_id = window.Android.getCampaignId();
    //   }
    //   if (!adKeyValue.campaign_id) {
    //     adKeyValue.campaign_id = '0';
    //   }
    //   return adKeyValue;
    // }
  }

export { getAdKeyValueFn, backtohp,B2CHost, hotelIdHost, CMSHost, adsHost, AdCurrencyPath, AdWeatherPath, backurl};
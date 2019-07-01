var moment = require('moment');

export function formatDate(d) {
    if (d) {
        return moment(d).format("dddd, MMM DD")
    }
    return ""
}

export function formatCurrencyDate(d) {
    if (d) {
        return moment(d).format("MMM DD YYYY")
    }
    return ""
}

export function dateFormat(ts) {
    var date = new Date(ts),
        year = date.getFullYear(),
        month = date.getMonth() + 1 > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
        day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minite = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    return year + "-" + month + "-" + day + " " + hour + ":" + minite + ":" + second;
}

let globalProperties = {};
let barcode = '355655090012297';
let campaignId = '';
let device_user_id = 0;//globalProperties.device_user_id
let conslog = '';
var isAndroid = typeof window.Android !== 'undefined'

export function initLocalConfig(){
    console.log("init config..")
    if (isAndroid && window.Android && window.Android.getGlobalProperties) {
        console.log("in android system")
        globalProperties = JSON.parse(window.Android.getGlobalProperties())
        barcode = globalProperties.imei
        // campaignId = window.Android.getCampaignId()
        device_user_id = globalProperties.device_user_id || 0
        conslog = window.Android.getGlobalProperties();
    }else{
        console.log("not in android system")
    }
}

export function getBarcode() {
    console.log("properties:",conslog)
    return barcode;
}

export function getDeviceUserID(){
    return device_user_id;
}

export function getGlobalProperties(){
    return globalProperties;
}

export const getElementTop = elt => {
    if (elt) {
      let actualTop = elt.offsetTop;
      let currentElt = elt.offsetParent;
  
      while (currentElt !== null) {
        actualTop += currentElt.offsetTop;
        currentElt = currentElt.offsetParent;
      }
  
      console.log("elt",elt)
      return actualTop;
    }
  };

  // get ad key value
export async function getAdKeyValueFn() {
    // return {
    //   hotel_id: '6312',
    //   campaign_id: '0',
    //   country: 100,
    //   lang: 'zh_cn',
    // };
    if (!adKeyValue) {
      const urlPar = {
        _barcode: barcode,
      };
      try {
        const result = await request.getCMSAdKeyValueFn(urlPar);
        // only call this api once
        adKeyValue = result.data.key_value;
        if (isAndroid) {
          adKeyValue.campaign_id = window.Android.getCampaignId();
        }
        if (!adKeyValue.campaign_id) {
          adKeyValue.campaign_id = '0';
        }
        return adKeyValue;
      } catch (e) {
        console.log(e);
      }
    } else {
      // campaign id reload
      if (isAndroid) {
        adKeyValue.campaign_id = window.Android.getCampaignId();
      }
      if (!adKeyValue.campaign_id) {
        adKeyValue.campaign_id = '0';
      }
      return adKeyValue;
    }
  }
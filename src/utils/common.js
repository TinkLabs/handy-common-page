var moment = require('moment');

export function formatDate(d) {
    if (d) {
        return moment('2019-06-14').format("dddd, MMM DD")
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
if (isAndroid && window.Android && window.Android.getGlobalProperties) {
    console.log("in android system")
    globalProperties = JSON.parse(window.Android.getGlobalProperties())
    barcode = globalProperties.imei
    // campaignId = window.Android.getCampaignId()
    device_user_id = globalProperties.device_user_id || 0
    conslog = window.Android.getGlobalProperties();
}
console.log("barcode:", barcode)

let isdebug = false;

export function setDebug(){
    isdebug = true
}

export function isDebug(){
    return isdebug
}

export function getgetppp(){
    return conslog;
}

export function alertcode(){
    let b = "barcode:"+barcode+",userid:"+device_user_id;
    
    if (isdebug){
        alert(b);
        alert(JSON.stringify(globalProperties));
    }
}

export function getBarcode() {
    return barcode;
}

export function getDeviceUserID(){
    return device_user_id;
}
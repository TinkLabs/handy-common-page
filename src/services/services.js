import request from '../utils/request';
import CMSHttp from './nhp-cms';
import { CMSHost } from '../utils/env';
import {isDebug,alertlog} from '../utils/common';

export function fetchWeather(barcode) {
    request(`https://hk.handy.travel/apis/get_weather_info?_barcode=${barcode}`).then(function(data){
        alert("hk weather:"+JSON.stringify(data));
    }).catch(function(err,errrr){
        console.log(err)
        alert("hkweather-"+"request err"+err);
    })
    return request(`${CMSHost}/apis/get_weather_info?_barcode=${barcode}`)
}

export function suicaLog2(barcode, suica) {
    let timestamp = new Date().getTime();
    return request(`${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}`);
}

export function suicaLog(barcode, suica, deviceuserid) {
    let timestamp = new Date().getTime();
    let url = `${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}&_device_user_id=${deviceuserid}`;
    alertlog(url);

    if (isDebug()){
        try {
            console.log("xx")
            request(`${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}`).then(function(data,err){
                alertlog("1-"+JSON.stringify(data)+JSON.stringify(err));
            }).catch(function(err,errrr){
                console.log(err)
                alertlog("2-"+"request err"+err);
            })
    
            CMSHttp('GET', `${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}&_device_user_id=${deviceuserid}`, {}).then(function(data){
                alertlog("3-"+JSON.stringify(data));
            }).catch(function(err,errrr){
                console.log(err)
                alertlog("4-"+"request err"+err);
            })
        }
        catch(e){
            console.log("..",e);
            let ee = "err"+e;
            alertlog(ee);
        }
    }
    
    
    return CMSHttp('GET', `${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}&_device_user_id=${deviceuserid}`, {})
}
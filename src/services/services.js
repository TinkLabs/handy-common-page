import request from '../utils/request';
import axios from 'axios';
import CMSHttp from './nhp-cms';
import { CMSHost } from '../utils/env';

export function fetchWeather2(barcode){
    let param = {_barcode:barcode}
    return axios.get(`${CMSHost}/apis/get_weather_info`, { params: param })
}

export function fetchWeather(barcode) {
    let param = {_barcode:barcode}
    return axios.get(`https://hk.handy.travel/apis/get_weather_info`, { params: param })
}

export function suicaLog2(barcode, suica) {
    let timestamp = new Date().getTime();
    return request(`${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}`);
}

export function suicaLog(barcode, suica, deviceuserid) {
    let timestamp = new Date().getTime();
    // let url = `${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}&_device_user_id=${deviceuserid}`;
    let param = {
        _barcode:barcode,
        _suica:suica,
        _send_time:timestamp,
        _device_user_id:deviceuserid
    }
    return axios.get(`${CMSHost}/apis/suica_campaign_log`, { params: param })
}
import request from '../utils/request';
import CMSHttp from './nhp-cms';
import { CMSHost } from '../utils/env';

export function fetchWeather(barcode) {
    return request(`${CMSHost}/apis/get_weather_info?_barcode=${barcode}`)
}

export function suicaLog2(barcode, suica) {
    let timestamp = new Date().getTime();
    return request(`${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}`);
}

export function suicaLog(barcode, suica) {
    let timestamp = new Date().getTime();
    return CMSHttp('GET', `${CMSHost}/apis/suica_campaign_log?_barcode=${barcode}&_suica=${suica}&_send_time=${timestamp}`, {})
}
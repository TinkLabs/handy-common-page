import request from '../utils/request';
import CMSHttp from './nhp-cms';

export function query() {
  return request('/api/users');
}

export function fetchWeather(barcode){
  return request('https://staging.handy.travel/apis/get_weather_info?_barcode='+barcode)
}

export function suicaLog2(barcode,suica){
  let timestamp = new Date().getTime();
  return request(`http://staging.handy.travel/apis/suica_campaign_log?_barcode=357525080985059&_suica=${suica}&_send_time=${timestamp}`);
}



  /**
   * backend2 api
   */
  // 
  export function suicaLog(barcode,suica){
    let timestamp = new Date().getTime();
    return CMSHttp('GET', `http://staging.handy.travel/apis/suica_campaign_log?_barcode=357525080985059&_suica=${suica}&_send_time=${timestamp}`, {})
  }
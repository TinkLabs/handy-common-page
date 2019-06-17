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
  // console.log(`http://staging.handy.travel/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`);
  // return request(`https://staging.handy.travel/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`);
  // CMSHttp('GET', `https://staging.handy.travel/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`, {})
  // return request(`http://10.0.2.53/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`);
  return request(`https://staging.handy.travel/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`);
}



  /**
   * backend2 api
   */
  // 
  export function suicaLog(barcode,suica){
    let timestamp = new Date().getTime();
    console.log(`http://staging.handy.travel/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`)
    return CMSHttp('GET', `https://staging.handy.travel/apis/suica_campaign_log?barcode=${barcode}&suica=${suica}&send_time=${timestamp}`, {})
  }
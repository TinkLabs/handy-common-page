import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function fetchWeather(barcode){
  return request('https://staging.handy.travel/apis/get_weather_info?_barcode='+barcode)
}

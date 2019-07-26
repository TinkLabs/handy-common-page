import axios from "axios";
import { CMSHost } from "../utils/env";

let fetchWeather = barcode => {
  let param = { _barcode: barcode };
  return axios.get(`https://hk.handy.travel/apis/get_weather_info`, {
    params: param
  });
};

let fetchCurrency = currency => {
  return axios.get(
    `https://currency.handy.travel/currencies/${currency}/rates`
  );
};

let suicaLog = (barcode, suica, deviceuserid) => {
  let timestamp = new Date().getTime();
  let param = {
    _barcode: barcode,
    _suica: suica,
    _send_time: timestamp,
    _device_user_id: deviceuserid
  };
  return axios.get(`https://staging.handy.travel/apis/suica_campaign_log`, {
    params: param,
    timeout: 3000
  });
};

let getCMSAdKeyValueFn = (urlPar = {}) => {
  // console.log(".....",urlPar)
  return axios.get(`${CMSHost}/apis/key_value`, { params: urlPar });
};

export { fetchWeather, fetchCurrency, suicaLog, getCMSAdKeyValueFn };

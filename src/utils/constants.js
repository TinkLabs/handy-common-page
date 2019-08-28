let weathermap = {};
weathermap[0] = "0_Tornado.svg";
weathermap[1] = "1_Tropical Storm.svg";
weathermap[2] = "2_Hurricane.svg";
weathermap[3] = "3_Severe Thunderstorms.svg";
weathermap[4] = "4_Thunderstorms.svg";
weathermap[5] = "5_Mixed Rain And Snow.svg";
weathermap[6] = "6_Mixed Rain And Sleet.svg";
weathermap[7] = "7_Mixed Snow And Sleet.svg";
weathermap[8] = "8_Freezing Drizzle.svg";
weathermap[9] = "9_Drizzle.svg";
weathermap[10] = "10_Freezing Rain.svg";
weathermap[11] = "11_Showers.svg";
weathermap[12] = "12_Rain.svg";
weathermap[13] = "13_Snow Flurries.svg";
weathermap[14] = "14_Light Snow Showers.svg";
weathermap[15] = "15_Blowing Snow.svg";
weathermap[16] = "16_Snow.svg";
weathermap[17] = "17_Hail.svg";
weathermap[18] = "18_Sleet.svg";
weathermap[19] = "19_Dust.svg";
weathermap[20] = "20_Foggy.svg";
weathermap[21] = "21_Haze.svg";
weathermap[22] = "22_Smoky.svg";
weathermap[23] = "23_Blustery.svg";
weathermap[24] = "24_Windy.svg";
weathermap[25] = "25_Cold.svg";
weathermap[26] = "26_Cloudy.svg";
weathermap[27] = "27_Mostly Cloudy(night).svg";
weathermap[28] = "28_Mostly Cloudy(day).svg";
weathermap[29] = "29_Partly Cloudy(night).svg";
weathermap[30] = "30_Partly Cloudy(day).svg";
weathermap[31] = "31_Clear(night).svg";
weathermap[32] = "32_Sunny.svg";
weathermap[33] = "33_Fair(night).svg";
weathermap[34] = "34_Fair(day).svg";
weathermap[35] = "35_Mixed Rain And Hail.svg";
weathermap[36] = "36_Hot.svg";
weathermap[37] = "37_Isolated Thunderstorms.svg";
weathermap[38] = "38_Scattered Thunderstorms.svg";
weathermap[39] = "39_Scattered Showers(day).svg";
weathermap[40] = "40_Heavy Rain.svg";
weathermap[41] = "41_Scattered Snow Showers(day).svg";
weathermap[42] = "42_Heavy Snow.svg";
weathermap[43] = "43_Blizzard.svg";
weathermap[44] = "44_Not Available.svg";
weathermap[45] = "45_Scattered Showers(night).svg";
weathermap[46] = "46_Scattered Snow Showers(night).svg";
weathermap[47] = "47_Scattered Thundershowers.svg";

let currencymap = {};
currencymap["AUD"] = "AUD_Australia Dollar.svg";
currencymap["CAD"] = "CAD_Canada Dollar.svg";
currencymap["CHF"] = "CHF_Swiss Franc.svg";
currencymap["CNY"] = "CNY_China Yuan.svg";
currencymap["EUR"] = "EUR_Euro.svg";
currencymap["USD"] = "USD_US Dollar.svg";
currencymap["GBP"] = "GBP_British Pound.svg";
currencymap["HKD"] = "HKD_Hong Kong Dollar.svg";
currencymap["IDR"] = "IDR_Indonesian Rupiah.svg";
currencymap["INR"] = "INR_Indian Rupee.svg";
currencymap["JPY"] = "JPY_Japanese Yen.svg";
currencymap["KRW"] = "KRW_South Korean Won.svg";
currencymap["MYR"] = "MYR_Malaysian Ringgit.svg";
currencymap["NZD"] = "NZD_New Zealand Dollar.svg";
currencymap["PHP"] = "PHP_Philippine Peso.svg";
currencymap["RUB"] = "RUB_Russian Ruble.svg";
currencymap["SGD"] = "SGD_Singapore Dollar.svg";
currencymap["THB"] = "THB_Thai Baht.svg";

const href = window.location.href;
const urlLang = href.indexOf("lang=") !== -1 ? href.substr(href.indexOf("lang=") + 5, 5) : "ja_JP";

let title = "JR EAST x handy コラボキャンペーン";
let htmlLang = "ja";

switch (urlLang) {
  case "en_US":
    title = "JR EAST x handy Collaboration Campaign";
    htmlLang = "en";
    break;
  case "zh_CN":
    title = "JR EAST x handy 特别活动";
    htmlLang = "zh-CN";
    break;
  case "zh_TW":
    title = "JR EAST x handy 特別活動";
    htmlLang = "zh-TW";
    break;
  default:
    break;
}

export default {
  weathermap,
  currencymap,
  urlLang,
  title,
  htmlLang,
};

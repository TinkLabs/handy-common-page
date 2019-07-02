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

export const getElementTop = elt => {
    if (elt) {
      let actualTop = elt.offsetTop;
      let currentElt = elt.offsetParent;
  
      while (currentElt !== null) {
        actualTop += currentElt.offsetTop;
        currentElt = currentElt.offsetParent;
      }
  
    //   console.log("elt",elt)
      return actualTop;
    }
  };
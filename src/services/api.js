import { getCMSAdKeyValueFn } from "./services";
import {
  IsAndroid,
  getAdKeyValue,
  setAdKeyValue,
  getBarcode,
} from "../utils/env";

let getAdKeyValueFn = async () => {
  let adKeyValue = getAdKeyValue();
  if (!adKeyValue) {
    try {
      const result = await getCMSAdKeyValueFn({ _barcode: getBarcode() });
      adKeyValue = result.data.key_value;
      setAdKeyValue(adKeyValue);
    } catch (e) {
      console.log("get AdkeyvalueFn failed", e);
      adKeyValue = {
        device_user_id: "983591204",
        country: "112",
        lang: "en_US",
        zone_id: "23",
        star: "2",
        hotel_id: "5720",
      };
    }
  }

  if (IsAndroid()) {
    adKeyValue.campaign_id = window.Android.getCampaignId();
  }
  if (!adKeyValue.campaign_id) {
    adKeyValue.campaign_id = "0";
  }

  return adKeyValue || { campaign_id: "0" };
};

export { getAdKeyValueFn };

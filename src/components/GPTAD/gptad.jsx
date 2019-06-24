import * as React from 'react';
import { Bling as GPT } from 'react-gpt';
// import { getAdKeyValueFn } from '../../services/utils/constant';

async function getAdKeyValueFn() {
    return {
      hotel_id: '6312',
      campaign_id: '0',
    };
}
GPT.enableSingleRequest();
/*
 * Remarks
 * 1. `beforeunload` is fired a few times for unknown reason, check if onClick is already fired before calling
 * 2. events fired with user action:
 *      tap: focus x2 > blur > mouseover > beforeunload x3+
 *      long press: focus x2 > blur
 */

export default class GPTAD extends React.Component {
  async getAdKeyValue() {
    let adParamsDict = [];
    let adKeyValue = {};
    let adKeyArr = [];

    try {
      adKeyValue = await getAdKeyValueFn();
    } catch (e) {
      console.log('getAdKeyValue error', e);
    }

    // adKeyValue = {
    //     "travel_spend":"1",
    //     "country_of_origin":"2",
    //     "income_level":"1",
    //     "spending_level":"2",
    //     "geo_location":"Hong Kong",
    //     "gender":"male",
    //     "trip_type":"3",
    //     "search_segment":"3",
    //     "browse_segment":"3",
    //     "age_group":"3",
    //     "family_members":"3",
    //     "device_user_id":"983587437",
    //     "imei":"355655090002686",
    //     "latitude":"22.528307",
    //     "longitude":"113.938240",
    //     "country":"100",
    //     "lang":"en_US",
    //     "zone_id":"3",
    //     "star":"0",
    //     "hotel_id":"3747"
    //   }
    adKeyArr = Object.keys(adKeyValue);

    adKeyArr.forEach((item, index) => {
      adParamsDict[index] = {};
      adParamsDict[index].key = adKeyArr[index];
      adParamsDict[index].value = adKeyValue[adKeyArr[index]];
    });

    adParamsDict.forEach(item => {
      GPT.setTargeting(item.key, item.value);
    });
  }
  render() {
    // not good, but if not put it here, when refresh ad may not get newest key value
    this.getAdKeyValue();
    return (
      <GPT
        adUnitPath={this.props.adUnitPath}
        slotSize={this.props.slotSize}
        onSlotOnload={this.props.onSlotOnload}
        onSlotRenderEnded={this.props.onSlotRenderEnded}
        collapseEmptyDiv
        renderWhenViewable={false}
      />
    );
  }
}

import mixpanel from 'mixpanel-browser';
import { getDeviceUserID, getGlobalProperties } from './common';

export function initMixpanel() {
    console.log("init mixpanel");
    mixpanel.init('6c29862add298fba05d9fd796a51e441');
    mixpanel.identify(getDeviceUserID());
    mixpanel.register({
        ...getGlobalProperties(),
        section: 'home',
        category: 'tool',
    });
    return mixpanel;
}

export function trackOnLoadWeather(scale) {
    console.log("mixpanel weather ",scale,{
        screen_name: 'handy|Launcher|Weather',
        temperature_scale: scale,
        url: window.location.href,
        subcategory: 'weather',
    })
    mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|Weather',
        temperature_scale: scale,
        url: window.location.href,
        subcategory: 'weather',
    });
}

export function trackOnLoadCurrency(base, quote) {
    console.log("mixpanel currency ",base, quote)
    mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverter',
        swap_currency: base + ":" + quote,
        url: window.location.href,
        subcategory: 'currency-converter',
    });
}

export function trackOnLoadCurrencySelect() {
    console.log("mixpanel currency select")
    mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverterSelect',
        url: window.location.href,
        subcategory: 'currency-converter',
    });
}
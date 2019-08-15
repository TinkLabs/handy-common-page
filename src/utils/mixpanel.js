import mixpanel from "mixpanel-browser";
import { getDeviceUserID, getGlobalProperties } from "./env";

mixpanel.init("6c29862add298fba05d9fd796a51e441");
mixpanel.identify(getDeviceUserID());

window.mixpanel = mixpanel;

export default () => {
  console.log("init mixpanel");
  mixpanel.init("6c29862add298fba05d9fd796a51e441");
  mixpanel.identify(getDeviceUserID());
  mixpanel.register({
    ...getGlobalProperties(),
    section: "home",
    category: "tool",
  });
  return mixpanel;
};

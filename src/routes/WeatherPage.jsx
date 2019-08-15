import React from "react";
import BasicInfo from "../components/basicInfo/basicInfo";
import SwitchBox from "../components/switchBox/switch";
import WeatherToDay from "../components/weatherToDay/weatherToDay";
import WeatherForecast from "../components/weatherForecast/weatherForecast";
import styles from "./WeatherPage.css";
import { connect } from "dva";
import { backtohp } from "../utils/env";
import AdUnit from "../components/AmpAD";
import DebugIt from "../components/mydebug/DebugIt";

const WeatherPage = props => {
  var onReturn = () => {
    console.log("back to some page");
    // props.history.goBack();
    backtohp();
  };

  var onSwitch = data => {
    props.dispatch({
      type: "weather/changeTempType",
      payload: { temptype: data },
    });

    if (window.mixpanel) {
      window.mixpanel.track("Screen View", {
        screen_name: "handy|Launcher|Weather",
        temperature_scale: data == 1 ? "Celsius" : "Fahrenheit",
        url: window.location.href,
        subcategory: "weather",
      });
    }
  };

  return (
    <div>
      {/* <TopBar onReturn={onReturn} title={"Weather Forecast"}></TopBar> */}
      <div className={styles.content}>
        <div className={styles.weatherinfobody}>
          <BasicInfo />
          <div className={styles.switchdiv}>
            <SwitchBox onChange={onSwitch} />
          </div>
        </div>
        <WeatherToDay />
        <WeatherForecast />
        <div className={styles.addiv}>
          <div className={styles.adone} id="ad1">
            {/* <GPTPanel path={AdWeatherPath} size={[360, 210]} target={[300,175]} parent={"#ad1"} /> */}
            {/* <AdUnit ADUnit=" AD-Unit1" /> */}
            <AdUnit ADUnit="Ad-Unit1" />
          </div>
        </div>
      </div>
      <DebugIt />
    </div>
  );
};

WeatherPage.propTypes = {};

function mapStateToProps(state) {
  return state.weather;
}

export default connect(mapStateToProps)(WeatherPage);

import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../components/topBar/TopBar';
import BasicInfo from '../components/basicInfo/basicInfo';
import SwitchBox from '../components/switchBox/switch';
import WeatherToDay from '../components/weatherToDay/weatherToDay';
import WeatherForecast from '../components/weatherForecast/weatherForecast';
import styles from './WeatherPage.css';
import GPTPanel from '../components/GPTPanel';
import { connect } from 'dva';
import {trackOnLoadWeather} from '../utils/mixpanel';
import {AdWeatherPath,backtohp} from '../utils/env';
import AdUnit from '../components/AmpAD';



const WeatherPage = (props) => {
  var onReturn = () => {
    console.log("back to some page");
    // props.history.goBack();
    backtohp();
  }


  var onSwitch = (data) => {
    props.dispatch({
      type:"weather/changeTempType",
      payload:{temptype:data}
    })
    trackOnLoadWeather(data == 1?"Celsius":"Fahrenheit");
  }

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
        <AdUnit ADUnit="Carousel-Companion" />
        </div>
      </div>
    </div>
  </div>
  );
};

WeatherPage.propTypes = {

};

function mapStateToProps(state) {
  return state.weather;
}

export default connect(mapStateToProps)(WeatherPage);
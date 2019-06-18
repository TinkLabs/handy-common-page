import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../components/topBar/TopBar';
import BasicInfo from '../components/basicInfo/basicInfo';
import SwitchBox from '../components/switchBox/switch';
import WeatherToDay from '../components/weatherToDay/weatherToDay';
import WeatherForecast from '../components/weatherForecast/weatherForecast';
import styles from './WeatherPage.css';
import { connect } from 'dva';

const WeatherPage = (props) => {
  var onReturn = () => {
    console.log("back to some page");
  }

  var onSwitch = (data) => {
    props.dispatch({
      type:"weather/changeTempType",
      payload:{temptype:data}
    })
  }

  return (
    <div>
    <TopBar onReturn={onReturn} title={"Weather Forecast"}></TopBar>
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
        <div className={styles.adone}>
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
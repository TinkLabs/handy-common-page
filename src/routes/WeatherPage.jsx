import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../components/TopBar.js';
import BasicInfo from '../components/basicInfo.js';
import SwitchBox from '../components/switch.js';
import styles from './WeatherPage.css';
import { connect } from 'dva';

const WeatherPage = (props) => {
  var init = () => {
    props.dispatch({
      type:"weather/initData",
      payload:{}
    })
  }
  init()

  var switchit = () => {
    console.log("xx");
  }

  var onSwitch = (data) => {
    props.dispatch({
      type:"weather/changeTempType",
      payload:{temptype:data}
    })
  }

  return (
    <div>
    <TopBar onReturn={switchit} ></TopBar>
    <div className={styles.content}>
      <div className={styles.weatherinfobody}>
        <BasicInfo />
        <div className={styles.switchdiv}>
          <SwitchBox onChange={onSwitch} />
        </div>
      </div>
      <div className={styles.weathertodaydiv}>
          <div className={styles.weatherpicdiv}>
            <img className={styles.weathermainimg} src={require('../assets/weather/28_Mostly Cloudy(day).svg')}/>
          </div>
          <div className={styles.weathertempdiv}>
            <span className={styles.weathertempnum}>23℃</span>
            <p className={styles.weatherrange}>21℃ ~ 26℃</p>
          </div>
      </div>

      <div>
        <table className={styles.weathertable}>
          <tr>
            <td>Web</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
            <td>Sun</td>
          </tr>
          <tr>
            <td><img className={styles.weathersubimg} src={require('../assets/weather/12_Rain.svg')}/></td>
            <td><img className={styles.weathersubimg} src={require('../assets/weather/7_Mixed Snow And Sleet.svg')}/></td>
            <td><img className={styles.weathersubimg} src={require('../assets/weather/11_Showers.svg')}/></td>
            <td><img className={styles.weathersubimg} src={require('../assets/weather/23_Blustery.svg')}/></td>
            <td><img className={styles.weathersubimg} src={require('../assets/weather/4_Thunderstorms.svg')}/></td>
          </tr>
          <tr>
          <td className={styles.weathersubrange}>21~26℃</td>
          <td className={styles.weathersubrange}>21~26℃</td>
          <td className={styles.weathersubrange}>21~26℃</td>
          <td className={styles.weathersubrange}>21~26℃</td>
          <td className={styles.weathersubrange}>21~26℃</td>
          </tr>
        </table>
      </div>
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
  console.log(state.weather)
  return state.weather;
}

export default connect(mapStateToProps)(WeatherPage);
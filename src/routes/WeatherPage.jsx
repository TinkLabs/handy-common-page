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
      <div>
          xxx
      </div>
      <div>
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
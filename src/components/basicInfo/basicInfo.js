import React from 'react';
import PropTypes from 'prop-types';
import styles from './basicinfo.css';
import { connect } from 'dva';

const BasicInfo = (props) => {


  return (
    <ul className={styles.infolist}>
        <li className={styles.infoli}>
        <img className={styles.liimg} src={require('../../assets/icon/icon-action-calendar-today-24-px.svg')}/>
        <span className={styles.licontent}>{props.daytime}</span>
        </li>
        <li className={styles.infoli}>
        <img className={styles.liimg} src={require('../../assets/icon/icon-communication-location-on-24-px.svg')}/>
        <span className={styles.licontent}>{props.location}</span>
        </li>
    </ul>
  );
};

BasicInfo.propTypes = {
    // onReturn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state.weather;
  }

export default connect(mapStateToProps)(BasicInfo);
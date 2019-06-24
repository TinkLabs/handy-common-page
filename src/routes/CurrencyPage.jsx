import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../components/topBar/TopBar';
import CurrencyPanel from '../components/currencyPanel/currency';
import styles from './CurrencyPage.css';
import { connect } from 'dva';
import {formatCurrencyDate} from '../utils/common';
import DebugIt from '../components/mydebug/DebugIt';

const CurrencyPage = (props) => {
  var onReturn = () => {
    console.log("back to some page");
  }

  var onSwitch = (data) => {
    props.dispatch({
      type:"currency/changeTempType",
      payload:{temptype:data}
    })
  }

  console.log(props)
  return (
    <div>
    <TopBar onReturn={onReturn} title={"Currency Converter"}></TopBar>
    <div className={styles.content}>
      <p className={styles.lastupdate}>Last update {formatCurrencyDate(props.lastupdate)}</p>
      <CurrencyPanel />
    </div>
    <DebugIt></DebugIt>
  </div>
  );
};

CurrencyPage.propTypes = {

};

function mapStateToProps(state) {
  return state.currency;
}

export default connect(mapStateToProps)(CurrencyPage);
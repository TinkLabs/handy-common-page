import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../components/topBar/TopBar';
import styles from './CurrencyPage.css';
import { connect } from 'dva';
import {formatCurrencyDate} from '../utils/common';

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

  return (
    <div>
    <TopBar onReturn={onReturn} title={"Currency Converter"}></TopBar>
    <div className={styles.content}>
      <p className={styles.lastupdate}>Last update {formatCurrencyDate(props.lastupdate)}</p>
      <div className={styles.currencydiv}>
        <div className={styles.currencybasetitle}>

        </div>
        <div className={styles.currencybaseinput}>

        </div>
        <div className={styles.splitdiv}></div>
        <div className={styles.currencyquotetitle}>

        </div>
        <div className={styles.currencyquoteinput}>

        </div>

      </div>

    </div>
  </div>
  );
};

CurrencyPage.propTypes = {

};

function mapStateToProps(state) {
  return state.currency;
}

export default connect(mapStateToProps)(CurrencyPage);
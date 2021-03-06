import React from "react";
import CurrencyPanel from "../components/currencyPanel/currency";
import styles from "./CurrencyPage.css";
import { connect } from "dva";
import { formatCurrencyDate } from "../utils/common";
import DebugIt from "../components/mydebug/DebugIt";
import AdUnit from "../components/AmpAD";

const CurrencyPage = props => {
  var onReturn = () => {
    console.log("back to some page");
    // props.history.goBack();
    // backtohp();
  };

  return (
    <div>
      {/* <TopBar onReturn={onReturn} title={"Currency Converter"}></TopBar> */}
      <div className={styles.content}>
        <p className={styles.lastupdate}>
          Last update {formatCurrencyDate(props.lastupdate)}
        </p>
        <CurrencyPanel />
        <div className={styles.addiv}>
          <div className={styles.adone} id="ad1">
            {/* <GPTPanel path={AdCurrencyPath} size={[360, 210]} target={[300,175]} parent={"#ad1"} /> */}
            <AdUnit ADUnit="Ad-Unit1" />
          </div>
        </div>
      </div>
      <DebugIt />
    </div>
  );
};

CurrencyPage.propTypes = {};

function mapStateToProps(state) {
  return state.currency;
}

export default connect(mapStateToProps)(CurrencyPage);

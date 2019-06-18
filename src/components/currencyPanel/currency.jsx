import React from 'react';
import dva, { connect } from 'dva';
import styles from './currency.css';
import constants from '../../utils/constants';

class CurrencyPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          foo:"bar"
        }
    }
    componentDidCatch(e) {
      //console.log("CurrencyPanel didcatch",e.message);
    }
    componentDidMount() {
      //console.log("CurrencyPanel props",this.props);
    }

    parseImgSrc = (code) => {
      return require("../../assets/currency/"+ constants.currencymap[code].trim());
    }

    getImgDesc = (code) => {
        return constants.currencymap[code].trim().split("_")[1].split('.')[0];
    }
    
    render() {
      return <div className={styles.currencydiv}>
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
    }
}

function mapStateToProps(state) {
  const {lastupdate} = state.currency;
  return {
    lastupdate
  };
}

export default connect(mapStateToProps)(CurrencyPanel)
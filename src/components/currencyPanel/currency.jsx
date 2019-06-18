import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
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
      return ""//require("../../assets/currency/"+ constants.currencymap[code].trim());
    }

    getImgDesc = (code) => {
        return constants.currencymap[code].trim().split("_")[1].split('.')[0];
    }

    onChangeColor = (color) => {
      console.log(color)
    };
    
    render() {
      const colorStyle = {
        display: 'inline-block',
        verticalAlign: 'middle',
        width: '20px',
        height: '20px',
        marginRight: '10px',
      };
      const colors = []
      for (var i =0;i<20;i++){
        colors.push({
          label:
          (<div>
            <img style={{ ...colorStyle}} src={require("../../assets/currency/USD_US Dollar.svg")} />
            <span className={styles.selcttext}>USD</span>
          </div>),
          value: 'USD',
        })
      }
      
      //   {
      //     label:
      //     (<div>
      //       <img style={{ ...colorStyle}} src={require("../../assets/currency/USD_US Dollar.svg")} />
      //       <span className={styles.selcttext}>USD</span>
      //     </div>),
      //     value: '#0000FF',
      //   },
      // ];
      
      return <div className={styles.currencydiv}>
                <Picker
                  data={colors}
                  value={['#00FF00']}
                  cols={1}
                  onChange={this.onChangeColor}
                  title={"Select the currency"}
                  okText={" "}
                  dismissText={" "}
                >
                  <div className={styles.currencybasetitle}>
                    <img className={styles.titleimg} src={require("../../assets/currency/USD_US Dollar.svg")} />
                    <span className={styles.titletext}>USD</span>
                    <img className={styles.titletext} src={require('../../assets/icon/expand-more-24-px.svg')}></img>
                  </div>
                </Picker>
                <div className={styles.currencybaseinput}>

                </div>
                <div className={styles.splitdiv}></div>
                <div className={styles.currencyquotetitle}>
                  <img className={styles.titleimg} src={require("../../assets/currency/GBP_British Pound.svg")} />
                  <span className={styles.titletext}>GBP</span>
                  <img className={styles.titletext} src={require('../../assets/icon/expand-more-24-px.svg')}></img>
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
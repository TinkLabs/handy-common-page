import React from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import dva, { connect } from 'dva';
import styles from './currency.less';
import constants from '../../utils/constants';

class CurrencyPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: "bar",
      basevisible:false,
    }
  }
  componentDidCatch(e) {
    //console.log("CurrencyPanel didcatch",e.message);
  }
  componentDidMount() {
    //console.log("CurrencyPanel props",this.props);
  }

  parseImgSrc = (code) => {
    if (constants.currencymap[code]){
      return require("../../assets/currency/"+ constants.currencymap[code].trim());
    }
    return ""
  }

  getImgDesc = (code) => {
    return constants.currencymap[code].trim().split("_")[1].split('.')[0];
  }

  onChangeBase = (color) => {
    console.log(color)
    // this.set({
    //   type:"currency/save",
    //   payload:{base:color}
    // })
  };

  onClick = (e) => {
    console.log("onclick")
  }

  render() {
    let colors = []
    for (var key in constants.currencymap){
        colors.push({
          label:
            <div className={styles.selectitem} onClick={this.onChangeBase.bind(this,key)}>
              <div className={styles.selectitemcontent}>
              <img className={styles.selectflag} src={this.parseImgSrc(key)} />
              <span className={styles.selcttext}>{key}</span>
              {
                this.props.base == key ?
                <img className={styles.selectok} src={require("../../assets/icon/done-24-px.svg")} />:
                <span></span>
              }
              </div>
            </div>,
          value: key,
        })
    }

    let xxx = <img className={styles.titleimg} onClick={this.onClick} src={require("../../assets/currency/GBP_British Pound.svg")} />;

    return <div className={styles.currencydiv}>
      <Picker
      onClick={this.onClick}
        data={colors}
        value={[this.props.base]}
        visible={this.state.basevisible}
        cols={1}
        onChange={this.onChangeBase}
        title={<span className={styles.selecttitle}>Select the currency</span>}
        okText={<img className={styles.selecttitleclose} src={require("../../assets/icon/clear-24-px.svg")} />}
        dismissText={" "}
        className={styles.ampickerpopup}
        onSelect={this.onChangeBase}
        // onPickerChange={this.onChangeBase}
      >
        <div className={styles.currencybasetitle} >
          <img className={styles.titleimg} src={this.parseImgSrc(this.props.base)} />
          <span className={styles.titletext}>{this.props.base}</span>
          <img className={styles.titletextselectimg} src={require('../../assets/icon/expand-more-24-px.svg')}></img>
        </div>
      </Picker>
      <div className={styles.currencybaseinput}>

      </div>
      <div className={styles.splitdiv}></div>
      <div className={styles.currencyquotetitle}>
        <img className={styles.titleimg} onClick={this.onClick} src={require("../../assets/currency/GBP_British Pound.svg")} />
        {xxx}
        <span className={styles.titletext}>GBP</span>
        <img className={styles.titletext} src={require('../../assets/icon/expand-more-24-px.svg')}></img>
      </div>
      <div className={styles.currencyquoteinput}>

      </div>
    </div>
  }
}

function mapStateToProps(state) {
  // const { lastupdate } = state.currency;
  return {
    ...state.currency
  };
}

export default connect(mapStateToProps)(CurrencyPanel)
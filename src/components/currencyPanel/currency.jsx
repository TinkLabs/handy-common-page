import React from 'react';
import { Picker } from 'antd-mobile';
import { InputItem } from 'antd-mobile';
import dva, { connect } from 'dva';
import styles from './currency.less';
import constants from '../../utils/constants';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
class CurrencyPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: "bar",
      basevisible: false,
      quotevisible: false,
      basevalue: "",
      quotevalue: "",
    }
  }
  componentDidCatch(e) {
    //console.log("CurrencyPanel didcatch",e.message);
  }
  componentDidMount() {
    // trackOnLoadCurrency(this.props.base,this.props.quote);
    if (window.mixpanel) {
      window.mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverter',
        swap_currency: this.props.base + ":" + this.props.quote,
        url: window.location.href,
        subcategory: 'currency-converter',
      });
    }
  }

  parseImgSrc = (code) => {
    if (constants.currencymap[code]) {
      return require("../../assets/currency/" + constants.currencymap[code].trim());
    }
    return ""
  }

  iconClose = () => {
    return require("../../assets/icon/clear-24-px.svg")
  }

  iconOk = () => {
    return require("../../assets/icon/done-24-px.svg")
  }

  iconMore = () => {
    return require('../../assets/icon/expand-more-24-px.svg')
  }

  getImgDesc = (code) => {
    return constants.currencymap[code].trim().split("_")[1].split('.')[0];
  }

  onChangeBase = (val) => {
    console.log("xxxxxxx", val)
    this.setState({ basevisible: !this.state.basevisible })
    this.props.dispatch({
      type: "currency/save",
      payload: { base: val }
    })

    this.props.dispatch({
      type: "currency/fetchCurrency",
      payload: { currency: val }
    })

    if (window.mixpanel) {
      window.mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverter',
        swap_currency: val + ":" + this.props.quote,
        url: window.location.href,
        subcategory: 'currency-converter',
      });
    }
  };

  onBaseVisibleChange = () => {
    if (window.mixpanel) {
      window.mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverterSelect',
        url: window.location.href,
        subcategory: 'currency-converter',
      });
    }

    this.setState({ basevisible: !this.state.basevisible })
  }

  onChangeQuote = (val) => {
    console.log("onChangeQuote", val)
    this.setState({ quotevisible: !this.state.quotevisible })

    this.props.dispatch({
      type: "currency/save",
      payload: { quote: val }
    })

    this.props.dispatch({
      type: "currency/fetchCurrency",
      payload: { currency: val }
    })

    if (window.mixpanel) {
      window.mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverter',
        swap_currency: this.props.base + ":" + val,
        url: window.location.href,
        subcategory: 'currency-converter',
      });
    }
  };

  onQuoteVisibleChange = () => {
    if (window.mixpanel) {
      window.mixpanel.track('Screen View', {
        screen_name: 'handy|Launcher|CurrencyConverterSelect',
        url: window.location.href,
        subcategory: 'currency-converter',
      });
    }
    this.setState({ quotevisible: !this.state.quotevisible })
  }

  onClick = (e) => {
    console.log("onclick")
  }

  validinput = (v, prev) => {
    if (v && !/^(([1-9]\d*)|0)(\.\d{0,4}?)?$/.test(v)) {
      if (v === '.') {
        return '0.';
      }
      return prev;
    }
    return v
    // if ((v+"").indexOf("."))
  }

  onBaseInputChange = (v) => {
    let newval = this.validinput(v, this.props.baseval);

    this.props.dispatch({
      type: "currency/savebase",
      payload: { baseval: newval }
    })
  }

  onQuoteInputChange = (v) => {
    let newval = this.validinput(v, this.props.quoteval);

    this.props.dispatch({
      type: "currency/savequote",
      payload: { quoteval: newval }
    })
  }

  getInitData = (f, select) => {
    // console.log(f);
    let data = []
    for (var key in constants.currencymap) {
      data.push({
        label:
          <div className={styles.selectitem} onClick={f.bind(this, key)}>
            <div className={styles.selectitemcontent}>
              <img key={key + "i"} alt={key} className={styles.selectflag} src={this.parseImgSrc(key)} />
              <span className={styles.selcttext}>{key}</span>
              {
                select === key ?
                  <img key={key + "o"} alt={key} className={styles.selectok} src={this.iconOk()} /> :
                  <span></span>
              }
            </div>
          </div>,
        value: key,
      })
    }
    return data;
  }

  render() {
    // const { getFieldProps } = this.props.form;
    return <div className={styles.currencydiv}>
      <Picker
        data={this.getInitData(this.onChangeBase, this.props.base)}
        value={[this.props.base]}
        visible={this.state.basevisible}
        cols={1}
        title={<span className={styles.selecttitle}>Select the currency</span>}
        okText={<img className={styles.selecttitleclose} src={this.iconClose()} />}
        dismissText={" "}
        className={styles.ampickerpopup}
        onDismiss={this.onBaseVisibleChange}
        onOk={this.onBaseVisibleChange}
      >
        <div className={styles.currencybasetitle} onClick={this.onBaseVisibleChange}>

          <img className={styles.titleimg} src={this.parseImgSrc(this.props.base)} />
          <span className={styles.titletext}>{this.props.base}</span>
          <img className={styles.titletextselectimg} src={this.iconMore()}></img>
        </div>
      </Picker>
      <div className={styles.currencybaseinput}>
        <InputItem
          className={styles.moneyinput}
          value={this.props.baseval == "0.0000" ? "" : this.props.baseval}
          type="money"
          placeholder="0.00"
          clear
          moneyKeyboardAlign="left"
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          onChange={this.onBaseInputChange}
        ></InputItem>
      </div>
      {/* <div className={styles.splitdiv}></div> */}
      <Picker
        data={this.getInitData(this.onChangeQuote, this.props.quote)}
        value={[this.props.quote]}
        visible={this.state.quotevisible}
        cols={1}
        title={<span className={styles.selecttitle}>Select the currency</span>}
        okText={<img className={styles.selecttitleclose} src={this.iconClose()} />}
        dismissText={" "}
        onTouchStart={e => { e.preventDefault() }}
        className={styles.ampickerpopup}
        onDismiss={this.onQuoteVisibleChange}
        onOk={this.onQuoteVisibleChange}
      >
        <div className={styles.currencyquotetitle} onClick={this.onQuoteVisibleChange}>
          <img className={styles.titleimg} src={this.parseImgSrc(this.props.quote)} />
          <span className={styles.titletext}>{this.props.quote}</span>
          <img className={styles.titletext} src={this.iconMore()}></img>
        </div>
      </Picker>
      <div className={styles.currencyquoteinput}>
        <InputItem
          className={styles.moneyinput}
          value={this.props.quoteval == "0.0000" ? "" : this.props.quoteval}
          type="money"
          placeholder="0.00"
          clear
          moneyKeyboardAlign="left"
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          onChange={this.onQuoteInputChange}
        ></InputItem>
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
// const CurrencyPanel = createForm()(H5NumberInputExample);
export default connect(mapStateToProps)(CurrencyPanel)
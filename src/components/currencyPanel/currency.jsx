import React from 'react';
import { Picker } from 'antd-mobile';
import dva, { connect } from 'dva';
import styles from './currency.less';
import constants from '../../utils/constants';

class CurrencyPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      foo: "bar",
      basevisible:false,
      quotevisible:false,
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

  onChangeBase = (val) => {
    console.log("xxxxxxx",val)
    
    this.setState({basevisible:!this.state.basevisible})
    this.props.dispatch({
      type:"currency/save",
      payload:{base:val}
    })
  };

  onBaseVisibleChange = () => {
    this.setState({basevisible:!this.state.basevisible})
  }

  onChangeQuote = (val) => {
    console.log("onChangeQuote",val)
    this.setState({quotevisible:!this.state.quotevisible})
    this.props.dispatch({
      type:"currency/save",
      payload:{quote:val}
    })
  };

  onQuoteVisibleChange = () => {
    this.setState({quotevisible:!this.state.quotevisible})
  }

  onClick = (e) => {
    console.log("onclick")
  }

  getInitData = (f,select) => {
    console.log(f);
    let data = []
    for (var key in constants.currencymap){
      data.push({
          label:
            <div className={styles.selectitem} onClick={f.bind(this,key)}>
              <div className={styles.selectitemcontent}>
              <img className={styles.selectflag} src={this.parseImgSrc(key)} />
              <span className={styles.selcttext}>{key}</span>
              {
                select == key ?
                <img className={styles.selectok} src={require("../../assets/icon/done-24-px.svg")} />:
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
    console.log("xxxx",this.props.quote)
    return <div className={styles.currencydiv}>
      <Picker
        data={this.getInitData(this.onChangeBase,this.props.base)}
        value={[this.props.base]}
        visible={this.state.basevisible}
        cols={1}
        title={<span className={styles.selecttitle}>Select the currency</span>}
        okText={<img className={styles.selecttitleclose} src={require("../../assets/icon/clear-24-px.svg")} />}
        dismissText={" "}
        className={styles.ampickerpopup}
        onDismiss={this.onBaseVisibleChange}
        onOk={this.onBaseVisibleChange}
      >
        <div className={styles.currencybasetitle} onClick={this.onBaseVisibleChange}>
          
          <img className={styles.titleimg} src={this.parseImgSrc(this.props.base)} />
          <span className={styles.titletext}>{this.props.base}</span>
          <img className={styles.titletextselectimg} src={require('../../assets/icon/expand-more-24-px.svg')}></img>
        </div>
      </Picker>
      <div className={styles.currencybaseinput}>

      </div>
      <div className={styles.splitdiv}></div>
      <Picker
        data={this.getInitData(this.onChangeQuote,this.props.quote)}
        value={[this.props.quote]}
        visible={this.state.quotevisible}
        cols={1}
        title={<span className={styles.selecttitle}>Select the currency</span>}
        okText={<img className={styles.selecttitleclose} src={require("../../assets/icon/clear-24-px.svg")} />}
        dismissText={" "}
        className={styles.ampickerpopup}
        onDismiss={this.onQuoteVisibleChange}
        onOk={this.onQuoteVisibleChange}
      >
      <div className={styles.currencyquotetitle} onClick={this.onQuoteVisibleChange}>
        <img className={styles.titleimg} src={this.parseImgSrc(this.props.quote)} />
        <span className={styles.titletext}>{this.props.quote}</span>
        <img className={styles.titletext} src={require('../../assets/icon/expand-more-24-px.svg')}></img>
      </div>
      </Picker>
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
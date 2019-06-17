import React from 'react';
import PropTypes from 'prop-types';
import styles from './jr.css';
import { connect } from 'dva';

const JR = (props) => {


  var onReturn = () => {
    window.location.href = 'https://www.hiinc.com/ja/';
  }

  var onValueChange = (data) => {
    // console.log("get ",props.suica)
    if (data.target.value == ""){
      return
    }
    // console.log("xxxxxx",data.target.value);
    props.dispatch({
      type:"jr/save",
      payload:{suica:data.target.value}
    })
  }

  var onSubmit = () => {
    props.dispatch({
      type:"jr/validcode",
      payload:{suica:props.suica}
    })
  }

  return (
    <div>
        <div className={styles.jrbackground}>
          <img className={styles.jrtext} src={require("../assets/jr/top_text.svg")}></img>
        </div>

        <div className={styles.jrform}>
            <p className={styles.jrsubtitle}>Enter Welcome Suica Number here</p>

            <div>
            <input onChange={onValueChange} className={styles.number} type="text" name="name"></input>

            <input onClick={onSubmit} className={styles.btn} type="submit" value="OK"></input>
            </div>
            
        </div>

        <div className={styles.footer}>
            <div>
              <img  onClick={onReturn} className={styles.logo} src={require("../assets/jr/hi_logo.svg")}></img>
            </div>
            <div>
            <a className={styles.maila} href="mailto:brandstrategy@ml.handytravel.co.jp">お問い合せ</a>
            </div>
            <div>
            <p className={styles.downp}>2019 © hi Japan Co., Ltd. All Rights Reserved.</p>
            </div>
        </div>
    </div>
  );
};

JR.propTypes = {

};

function mapStateToProps(state) {
  return state.jr;
}

export default connect(mapStateToProps)(JR);
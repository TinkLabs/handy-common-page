import React from 'react';
import PropTypes from 'prop-types';
import styles from './jr.css';
import { connect } from 'dva';
import { alertcode,getgetppp, setDebug } from '../utils/common';

const JR = (props) => {


  var onReturn = () => {
    window.location.href = 'https://www.hiinc.com/ja/';
  }

  var onValueChange = (data) => {
    // console.log("get ",props.suica)
    if (data.target.value == ""){
      props.dispatch({
        type:"jr/save",
        payload:{suica:data.target.value}
      })
    }
    if (!Number(data.target.value)){
      return
    }

    if (Number(data.target.value)>999999999999){
      return
    }

    props.dispatch({
      type:"jr/save",
      payload:{wrong:false,num:0}
    })

    props.dispatch({
      type:"jr/save",
      payload:{suica:data.target.value}
    })
  }

  var onSubmit = () => {
    if (props.btntext != "OK"){
      return
    }
    if (Number(props.suica)<100000000000 || Number(props.suica)>999999999999){
      props.dispatch({
        type:"jr/save",
        payload:{wrong:true}
      })
      return
    }
    props.dispatch({
      type:"jr/save",
      payload:{btntext:"waiting..."}
    })

    props.dispatch({
      type:"jr/validcode",
      payload:{suica:props.suica}
    })
  }

  var alertit = () =>{
    alertcode()
    let de = props.debugcount;
    de++;
    props.dispatch({
      type:"jr/save",
      payload:{debugcount:de}
    })
  }

  if (props.debugcount>5){
    setDebug()
  }

  return (
    <div>
        <div className={styles.jrbackground}>
          <img className={styles.jrtext} src={require("../assets/jr/top_text.svg")}></img>
        </div>

        <div className={styles.jrform}>
            <p className={styles.jrsubtitle}>Enter Welcome Suica Number here</p>
            {
              props.wrong?<span className={styles.failedstatus}>Please input 12 digits Suica number</span>:
              props.num == 0 ? <span></span>:
              props.success ? <span className={styles.okstatus}>Success!</span>:
              <span className={styles.failedstatus}>Failed!</span>
            }
            

            <div>
                <input value={props.suica} onChange={onValueChange} className={styles.number} type="text" name="name"></input>

                <input onClick={onSubmit} className={props.btntext=="OK"?styles.btn:styles.waitbtn} type="submit" value={props.btntext}></input>
            </div>

        </div>

        <div className={styles.footer}>
            <div>
              <img  onClick={onReturn} className={styles.logo} src={require("../assets/jr/hi_logo.svg")}></img>
            </div>
            <div>
            <a className={styles.maila}>お問い合せ</a>
            </div>
            <div>
            <p onClick={alertit} className={styles.downp}>2019 © hi Japan Co., Ltd. All Rights Reserved.</p>
            {
              props.debugcount > 5?
              <div>
                <a className="define-go-back" href={`homewebview:https://m-common-page.hi.com/#/weather`}>weather</a>
                <a href={`olink:https://m-common-page.hi.com/#/weather`}>olink1</a>
                <a href={`olink:m-common-page.hi.com/#/weather`}>olink2</a>
              </div>:<p></p>
            }
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
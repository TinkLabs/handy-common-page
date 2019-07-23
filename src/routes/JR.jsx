import React from "react";
import PropTypes from "prop-types";
import styles from "./jr.css";
import { connect } from "dva";
import DebugIt from "../components/mydebug/DebugIt";

const JR = props => {
  var onReturn = () => {
    window.location.href = "https://www.hiinc.com/ja/";
  };

  const checkChar = value => {
    const reg = /^[A-Za-z]{0,3}$/;
    return reg.test(value);
  }

  const validate = (data, index) => {
    // console.log("get ",props.suica)
    if (data.target.value === "") {
      props.dispatch({
        type: "jr/save",
        payload: { [`suica${index}`]: data.target.value }
      });
    }
    if (index < 2) {
      if (!Number(data.target.value) || Number(data.target.value) > 999) {
        return;
      }
    } else {
      console.log()
      if (!checkChar(data.target.value)) {
        return
      } else {
        data.target.value = data.target.value.toUpperCase()
      }
    }

    if (props.wrong) {
      props.dispatch({
        type: "jr/save",
        payload: { wrong: false, num: 0 }
      });
    }

    props.dispatch({
      type: "jr/save",
      payload: { [`suica${index}`]: data.target.value }
    });
  };

  var onValueChange = data => {
    console.log(data.target, 29999);
    switch (data.target.name) {
      case "name0":
        validate(data, 0);
        break;
      case "name1":
        validate(data, 1);
        break;
      case "name2":
        validate(data, 2);
        break;
      case "name3":
        validate(data, 3);
        break;
      default:
        break;
    }
  };

  var onSubmit = () => {
    if (props.btntext !== "OK") {
      return;
    }
    if (
      Number(props.suica) < 100000000000 ||
      Number(props.suica) > 999999999999
    ) {
      props.dispatch({
        type: "jr/save",
        payload: { wrong: true }
      });
      return;
    }
    props.dispatch({
      type: "jr/save",
      payload: { btntext: "waiting..." }
    });

    props.dispatch({
      type: "jr/validcode",
      payload: { suica: props.suica }
    });
  };

  return (
    <div>
      <div className={styles.jrbackground}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className={styles.jrtext}
          src={require("../assets/jr/top_text.svg")}
        />
      </div>

      <div className={styles.jrform}>
        <p className={styles.jrsubtitle}>Enter Welcome Suica Number here</p>
        {props.wrong ? (
          <span className={styles.failedstatus}>
            Please Check Your Suica Number
          </span>
        ) : props.num === 0 ? (
          <span />
        ) : props.success ? (
          <span className={styles.okstatus}>Success!</span>
        ) : (
          <span className={styles.failedstatus}>Failed!</span>
        )}

        <div>
          <div className={styles.suicaContainer}>
            <input
              value={props.suica0}
              onChange={onValueChange}
              className={styles.number}
              type="text"
              name="name0"
            />
            <input
              value={props.suica1}
              onChange={onValueChange}
              className={styles.number}
              type="text"
              name="name1"
            />
            <input
              value={props.suica2}
              onChange={onValueChange}
              className={styles.number}
              type="text"
              name="name2"
            />
            <input
              value={props.suica3}
              onChange={onValueChange}
              className={styles.number}
              type="text"
              name="name3"
            />
          </div>

          <input
            onClick={onSubmit}
            className={props.btntext === "OK" ? styles.btn : styles.waitbtn}
            type="submit"
            value={props.btntext}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            onClick={onReturn}
            className={styles.logo}
            src={require("../assets/jr/hi_logo.svg")}
          />
        </div>
        <div>
          <a className={styles.maila}>お問い合せ</a>
        </div>
        <div>
          <p className={styles.downp}>
            2019 © hi Japan Co., Ltd. All Rights Reserved.
          </p>
        </div>
        <DebugIt />
      </div>
    </div>
  );
};

JR.propTypes = {};

function mapStateToProps(state) {
  return state.jr;
}

export default connect(mapStateToProps)(JR);

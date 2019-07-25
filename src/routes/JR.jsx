import React from "react";
import PropTypes from "prop-types";
import styles from "./jr.css";
import { connect } from "dva";
import DebugIt from "../components/mydebug/DebugIt";

const JR = props => {
  let textInput1 = React.createRef();
  let textInput2 = React.createRef();
  let textInput3 = React.createRef();

  var onReturn = () => {
    window.location.href = "https://www.hiinc.com/ja/";
  };

  const checkChar = value => {
    const reg = /^[A-Za-z]{0,3}$/;
    return reg.test(value);
  };

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
      if (!checkChar(data.target.value)) {
        return;
      } else {
        data.target.value = data.target.value.toUpperCase();
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
    switch (data.target.name) {
      case "name0":
        validate(data, 0);
        if (data.target.value.length === 3) {
          textInput1.current.focus();
        }
        break;
      case "name1":
        validate(data, 1);
        if (data.target.value.length === 3) {
          textInput2.current.focus();
        }
        break;
      case "name2":
        validate(data, 2);
        if (data.target.value.length === 3) {
          textInput3.current.focus();
        }
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
    const temp = props.suica0 + props.suica1 + props.suica2 + props.suica3;

    if (temp.length !== 12) {
      props.dispatch({
        type: "jr/save",
        payload: { wrong: true }
      });
      return;
    }

    props.dispatch({
      type: "jr/save",
      payload: { suica: temp }
    });

    props.dispatch({
      type: "jr/save",
      payload: { btntext: "waiting..." }
    });

    props.dispatch({
      type: "jr/validcode",
      payload: { suica: temp }
    });
  };

  return (
    <div>
      {!(!props.wrong && props.num !== 0 && props.success) && (
        <div className="suica-input">
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
                  ref={textInput1}
                />
                <input
                  value={props.suica2}
                  onChange={onValueChange}
                  className={styles.number}
                  type="text"
                  name="name2"
                  ref={textInput2}
                />
                <input
                  value={props.suica3}
                  onChange={onValueChange}
                  className={styles.number}
                  type="text"
                  name="name3"
                  ref={textInput3}
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
        </div>
      )}
      {!props.wrong && props.num !== 0 && props.success && (
        <div className="suica-thx">
          <div className={styles.jrThxBackground}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              className={styles.jrtext}
              src={require("../assets/jr/thankyou_text.svg")}
            />
          </div>

          <div className={styles.jrform}>
            <p className={styles.jrThxSubtitle}>Consumer Feedback Survey</p>
            <div className={styles.iframeContainer}>
              <iframe
                title="survey"
                width="100%"
                height="100%"
                frameBorder="0"
                allowtransparency="true"
                src="https://www.surveymonkey.com/r/T5WQ6DX"
              />
            </div>
          </div>
        </div>
      )}

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

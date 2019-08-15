import React from "react";
import styles from "./newJR.scss";
import { connect } from "dva";
import DebugIt from "../../components/mydebug/DebugIt";
import { Trans, withTranslation } from "react-i18next";

const JR = props => {
  console.log(props.i18n.language, 29999);

  let textInput1 = React.createRef();
  let textInput2 = React.createRef();
  let textInput3 = React.createRef();

  document.addEventListener("click", event => {
    if (
      event.target &&
      (event.target.matches(`span.${styles.language}`) ||
        event.target.matches(`li`))
    ) {
      return;
    }
    props.dispatch({
      type: "jr/controlLangList",
      showLangList: false,
    });
  });

  var onReturn = () => {
    window.location.href = "https://www.hiinc.com/ja/";
  };

  const checkChar = value => {
    const reg = /^[A-Za-z]{0,3}$/;
    return reg.test(value);
  };
  const checkNumb = value => {
    const reg = /^[0-9]{0,3}$/;
    return reg.test(value);
  };

  const validate = (data, index) => {
    console.log(data.target.value);
    // console.log("get ",props.suica)
    if (data.target.value === "") {
      props.dispatch({
        type: "jr/save",
        payload: { [`suica${index}`]: data.target.value },
      });
    }
    if (data.target.value.length > 3) {
      return;
    } else {
      if (index < 2) {
        if (!checkNumb(data.target.value)) {
          props.dispatch({
            type: "jr/save",
            payload: { numberWrong: true, wrong: false },
          });
          return;
        }
      } else {
        if (!checkChar(data.target.value)) {
          props.dispatch({
            type: "jr/save",
            payload: { letterWrong: true, wrong: false },
          });
          return;
        } else {
          data.target.value = data.target.value.toUpperCase();
        }
      }
    }

    if (props.numberWrong) {
      props.dispatch({
        type: "jr/save",
        payload: { numberWrong: false },
      });
    }

    if (props.letterWrong) {
      props.dispatch({
        type: "jr/save",
        payload: { letterWrong: false },
      });
    }
    if (props.wrong) {
      props.dispatch({
        type: "jr/save",
        payload: { wrong: false, num: 0 },
      });
    }

    props.dispatch({
      type: "jr/save",
      payload: { [`suica${index}`]: data.target.value },
    });
  };

  var onValueChange = data => {
    switch (data.target.name) {
      case "name0":
        validate(data, 0);
        if (checkNumb(data.target.value) && data.target.value.length === 3) {
          textInput1.current.focus();
        }
        break;
      case "name1":
        validate(data, 1);
        if (checkNumb(data.target.value) && data.target.value.length === 3) {
          textInput2.current.focus();
        }
        break;
      case "name2":
        validate(data, 2);
        if (checkChar(data.target.value) && data.target.value.length === 3) {
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
        payload: { wrong: true, numberWrong: false, letterWrong: false },
      });
      return;
    }

    props.dispatch({
      type: "jr/save",
      payload: { suica: temp },
    });

    props.dispatch({
      type: "jr/save",
      payload: { btntext: "waiting..." },
    });

    props.dispatch({
      type: "jr/validcode",
      payload: { suica: temp },
    });
  };

  const showLangList = () => {
    props.dispatch({
      type: "jr/controlLangList",
      showLangList: true,
    });
  };

  const changeLang = lang => {
    props.i18n.changeLanguage(lang);
    props.dispatch({
      type: "jr/controlLangList",
      showLangList: false,
    });
  };

  return (
    <div className={styles.root}>
      {/* first page */}
      {!(!props.wrong && props.num !== 0 && props.success) && (
        <div className={styles.firstPage}>
          <div className={styles.bgImg} />
          {/* header and choose language */}
          <section className={styles.header}>
            <section className={styles.chooseLang}>
              <img src={require("../../assets/jr/new/lang.svg")} alt="" />
              <span className={styles.language} onClick={showLangList}>
                Language
              </span>
              {props.showLangList && (
                <ul className={styles.langList}>
                  <li onClick={changeLang.bind(null, "ja_JP")}>日本語</li>
                  <li onClick={changeLang.bind(null, "en_US")}>English</li>
                  <li onClick={changeLang.bind(null, "zh_CN")}>中国语（简）</li>
                  <li onClick={changeLang.bind(null, "zh_HK")}>
                    中国語（繁体）
                  </li>
                </ul>
              )}
            </section>

            {/* module1 */}
            <section className={styles.module1}>
              <header>
                <img
                  src={require("../../assets/jr/new/section1_header_company_logo.png")}
                  alt=""
                />
              </header>
              <div className={styles.welcome}>
                <img
                  src={require("../../assets/jr/new/header_welcomesuica_image.png")}
                  alt=""
                />
                <p>
                  <span
                    className={
                      props.i18n.language === "en_US"
                        ? `${styles.englishVersion}`
                        : ""
                    }
                  >
                    <Trans i18nKey="For Tourist">
                      For
                      <br />
                      Tourist
                    </Trans>
                  </span>
                </p>
              </div>
              <div className={styles.text}>
                <p className={styles.rightBig}>BUY</p>
                <p>
                  <span className={styles.rightBig}>&</span>
                  <span className={styles.leftSmall}>
                    Welcome
                    <br />
                    Suica
                  </span>
                </p>
                <p>
                  <span className={styles.rightBig}>GET!</span>
                </p>
                <p>
                  <span className={styles.leftSmall}>
                    Premium
                    <br />
                    Goods
                  </span>
                </p>
              </div>
              <div className={styles.knowMore}>
                <a href="#module3">
                  <button>{props.t("Know more")}</button>
                </a>
              </div>
            </section>

            {/* module2 */}
            <section className={styles.module2}>
              <div className={styles.bgImg2}>
                <img
                  src={require("../../assets/jr/new/back-city.svg")}
                  alt=""
                />
              </div>
              <header>
                <img
                  src={require("../../assets/jr/new/section2_concept_companylogo_pc.png")}
                  alt=""
                />
                <p>
                  <Trans i18nKey="Our desire is">
                    Our desire is to provide a safe and comfortable travel and
                    shopping experience for everyone who visits Japan.And as
                    part of fulfilling our goal,East Japan Railway Company and
                    hi Japan Co.,Ltd.are collaborating with selected hotels to
                    offer “Welcome Suica Campaign” with handy smartphones in the
                    hotel rooms.
                    <br />
                    Participating hotels: JR-East Hotel Mets Shibuya, The Tokyo
                    Station Hotel, and The Hotel Metropolitan.
                  </Trans>
                </p>
              </header>
              <div className={styles.middle}>
                <img
                  src={require("../../assets/jr/new/logo_jre_hotel.svg")}
                  alt=""
                />
                <img
                  src={require("../../assets/jr/new/logo_tokyo_st_hotel.svg")}
                  alt=""
                />
                <img
                  src={require("../../assets/jr/new/logo_hotel_met.svg")}
                  alt=""
                />
                <p>
                  <Trans i18nKey="We hope you enjoy">
                    We hope you enjoy your stay in Japan
                    <br />
                    with handy and Welcome Suica!
                  </Trans>
                </p>
              </div>
            </section>
          </section>
          {/* this is form start, do not change it logic */}
          <div className={styles.jrform}>
            <p className={styles.jrsubtitle}>Enter Welcome Suica Number here</p>
            <div className={styles.noticeTextContainer}>
              {props.numberWrong && (
                <span className={styles.failedstatus}>
                  Please Input Numbers
                </span>
              )}
              {props.letterWrong && (
                <span className={styles.failedstatus}>
                  Please Input Letters
                </span>
              )}
              {props.wrong ? (
                <span className={styles.failedstatus}>
                  Please Check Your Suica Number
                </span>
              ) : props.num === 0 ? (
                <span />
              ) : props.success ? (
                <span className={styles.okstatus}>Success!</span>
              ) : (
                <span className={styles.failedstatus}>
                  Something went wrong! Please try again
                </span>
              )}
            </div>

            <div>
              <div className={styles.suicaContainer}>
                <input
                  value={props.suica0}
                  onChange={onValueChange}
                  className={styles.number}
                  // type="number"
                  name="name0"
                />
                <input
                  value={props.suica1}
                  onChange={onValueChange}
                  className={styles.number}
                  // type="number"
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
          {/* this is form end */}
        </div>
      )}

      {/* thanks page */}
      {!props.wrong && props.num !== 0 && props.success && (
        <div className="suica-thx">
          <div className={styles.jrThxBackground}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              className={styles.jrtext}
              src={require("../../assets/jr/thankyou_text.svg")}
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

      {/* page */}
      <div className={styles.footer}>
        <div>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            onClick={onReturn}
            className={styles.logo}
            src={require("../../assets/jr/hi_logo.svg")}
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

export default withTranslation()(connect(mapStateToProps)(JR));

import React from "react";
import styles from "./newJR.scss";
import { connect } from "dva";
import DebugIt from "../../components/mydebug/DebugIt";
import { Trans, withTranslation } from "react-i18next";
import { Modal } from "antd-mobile";
const alert = Modal.alert;

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
    if (props.btntext !== "Submit") {
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
        // {false && (
        <div className={styles.firstPage}>
          <div
            className={styles.findForm}
            onClick={() => {
              document.documentElement.scrollTop = 2930;
              document.body.scrollTop = 2930;
            }}
          >
            <img
              src={require("../../assets/jr/new/goods_get_icon_en.svg")}
              alt=""
            />
          </div>
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
                  <li onClick={changeLang.bind(null, "zh_CN")}>中文（简体）</li>
                  <li onClick={changeLang.bind(null, "zh_HK")}>中文（繁體）</li>
                </ul>
              )}
            </section>

            {/* module1 */}
            <section className={styles.module1}>
              <header>
                <img
                  src={require("../../assets/jr/new/section1_header_company_logo_sp.svg")}
                  alt=""
                />
              </header>
              <div className={styles.welcome}>
                <img
                  src={require("../../assets/jr/new/header_welcomesuica_image.png")}
                  alt=""
                />
                <div className={styles.infoImg}>
                  {props.i18n.language === "en_US" && (
                    <img
                      src={require("../../assets/jr/new/header_greencircle_en.svg")}
                      alt=""
                    />
                  )}
                  {props.i18n.language === "ja_JP" && (
                    <img
                      src={require("../../assets/jr/new/header_greencircle_jp.svg")}
                      alt=""
                    />
                  )}
                  {props.i18n.language === "zh_CN" && (
                    <img
                      src={require("../../assets/jr/new/header_greencircle_cn.svg")}
                      alt=""
                    />
                  )}
                  {props.i18n.language === "zh_HK" && (
                    <img
                      src={require("../../assets/jr/new/header_greencircle_tw.svg")}
                      alt=""
                    />
                  )}
                </div>
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
                <button
                  onClick={() => {
                    document.documentElement.scrollTop = 1549;
                    document.body.scrollTop = 1549;
                  }}
                >
                  {props.t("Know more")}
                </button>
              </div>
            </section>

            {/* module2 */}
            <section className={styles.module2}>
              <div className={styles.bgImg2}>
                <img
                  src={require("../../assets/jr/new/section2_concept_bg_w375_sp.png")}
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
                    Our desire is to provide a safe and
                    <br />
                    comfortable travel and shopping
                    <br />
                    experience for everyone who visits Japan.
                    <br />
                    And as part of fulfilling our goal,
                    <br />
                    East Japan Railway Company and hi Japan
                    <br />
                    are collaborating with selected hotels to offer “Welcome
                    Suica Campaign” with handy smartphones in the hotel rooms.{" "}
                    <br />
                    Participating hotels: JR-East Hotel Mets Shibuya, The Tokyo
                    Station Hotel, and The Hotel Metropolitan.
                  </Trans>
                </p>
                <p>
                  <Trans i18nKey="Participating hotels">
                    Participating hotels:
                    <br />
                    JR-East Hotel Mets Shibuya,
                    <br />
                    The Tokyo Station Hotel,
                    <br />
                    and The Hotel Metropolitan.
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

          {/* module3 */}
          <section className={styles.module3}>
            <header>
              <p>{props.t("Join the campaign")}</p>
            </header>
            <div className={styles.top1}>
              <section>
                <div className={styles.top}>
                  <span className={styles.circle}>01</span>
                  <p>
                    <Trans i18nKey="Purchase the Welcome Suica">
                      Purchase the Welcome Suica
                      <br />
                      at designated locations
                    </Trans>
                    <img
                      src={require("../../assets/jr/new/section3_no1_shoplist_icon.svg")}
                      alt=""
                    />
                  </p>
                </div>
                <div className={styles.bottom}>
                  <img
                    src={require("../../assets/jr/new/section3_campaign_howto1_illust_pc.png")}
                    alt=""
                  />
                </div>
              </section>
              <section>
                <div className={styles.top}>
                  <span className={styles.circle}>02</span>
                  <p>
                    <Trans i18nKey="Enter Welcome Suica">
                      Enter Welcome Suica
                      <br />
                      number below
                    </Trans>
                  </p>
                </div>
                <div className={styles.bottom}>
                  <img
                    src={require("../../assets/jr/new/section3_campaign_howto2_illust_pc.png")}
                    alt=""
                  />
                </div>
              </section>
              <section>
                <div className={styles.top}>
                  <span className={styles.circle}>03</span>
                  <p>
                    <Trans i18nKey="Show the screen at the hotel front desk">
                      Show the screen at the hotel front desk
                      <br />
                      and get a gift!
                    </Trans>
                  </p>
                </div>
                <div className={styles.bottom}>
                  <img
                    src={require("../../assets/jr/new/section3_campaign_howto3_illust_pc.png")}
                    alt=""
                  />
                </div>
              </section>
            </div>
            <div className={styles.pic}>
              {props.i18n.language === "en_US" && (
                <img
                  src={require("../../assets/jr/new/premium_goods_sp_en.png")}
                  alt=""
                />
              )}
              {props.i18n.language === "ja_JP" && (
                <img
                  src={require("../../assets/jr/new/premium_goods_sp_jp.png")}
                  alt=""
                />
              )}
              {props.i18n.language === "zh_CN" && (
                <img
                  src={require("../../assets/jr/new/premium_goods_sp_cn.png")}
                  alt=""
                />
              )}
              {props.i18n.language === "zh_HK" && (
                <img
                  src={require("../../assets/jr/new/premium_goods_sp_tw.png")}
                  alt=""
                />
              )}
            </div>
            <div className={styles.inputForm}>
              <div className={styles.text}>
                <p className={styles.header}>
                  <Trans i18nKey="Please fill in your">
                    Please fill in your
                    <br />
                    Welcome Suica number
                  </Trans>
                </p>
                <div className={styles.content}>
                  <p>
                    <Trans i18nKey="Please enter the number on the first line">
                      Please enter the number on
                      <br />
                      the first line of the back of your Welcome Suica (refer to
                      the image)
                    </Trans>
                  </p>
                </div>
              </div>
              {/* this is form start, do not change it logic */}
              <div className={styles.jrform}>
                {/* <p className={styles.jrsubtitle}>
                  Enter Welcome Suica Number here
                </p> */}
                <div className={styles.noticeTextContainer}>
                  {props.numberWrong && (
                    <span className={styles.failedstatus}>
                      <p>{props.t("You can only enter numbers")}</p>
                    </span>
                  )}
                  {props.letterWrong && (
                    <span className={styles.failedstatus}>
                      <p>{props.t("You can only enter letters")}</p>
                    </span>
                  )}
                  {props.wrong ? (
                    <span className={styles.failedstatus}>
                      <p>{props.t("Please confirm your card number.")}</p>
                    </span>
                  ) : props.num === 0 ? (
                    <span />
                  ) : props.success ? (
                    <span className={styles.okstatus}>
                      <p>{props.t("Success!")}</p>
                    </span>
                  ) : (
                    <span className={styles.failedstatus}>
                      <p>{props.t("Something went wrong! Please try again")}</p>
                    </span>
                  )}
                </div>

                <div className={styles.suicaContainer}>
                  <input
                    value={props.suica0}
                    onChange={onValueChange}
                    className={styles.number}
                    placeholder={props.t("ex") + ":123"}
                    // type="number"
                    name="name0"
                  />
                  <input
                    value={props.suica1}
                    onChange={onValueChange}
                    className={styles.number}
                    placeholder={props.t("ex") + ":456"}
                    // type="number"
                    name="name1"
                    ref={textInput1}
                  />
                  <input
                    value={props.suica2}
                    onChange={onValueChange}
                    className={styles.number}
                    placeholder={props.t("ex") + ":ABC"}
                    type="text"
                    name="name2"
                    ref={textInput2}
                  />
                  <input
                    value={props.suica3}
                    onChange={onValueChange}
                    className={styles.number}
                    placeholder={props.t("ex") + ":DEF"}
                    type="text"
                    name="name3"
                    ref={textInput3}
                  />
                </div>

                <input
                  onClick={onSubmit}
                  className={
                    props.btntext === "Submit" ? styles.btn : styles.waitbtn
                  }
                  type="submit"
                  value={props.t("Submit")}
                />
                <div className={styles.bottomPic}>
                  {props.i18n.language === "en_US" && (
                    <img
                      src={require("../../assets/jr/new/section3_campaignhowto_infoillust_en.svg")}
                      alt=""
                    />
                  )}
                  {props.i18n.language === "ja_JP" && (
                    <img
                      src={require("../../assets/jr/new/section3_campaignhowto_infoillust_jp.svg")}
                      alt=""
                    />
                  )}
                  {props.i18n.language === "zh_CN" && (
                    <img
                      src={require("../../assets/jr/new/section3_campaignhowto_infoillust_cn.svg")}
                      alt=""
                    />
                  )}
                  {props.i18n.language === "zh_HK" && (
                    <img
                      src={require("../../assets/jr/new/section3_campaignhowto_infoillust_tw.svg")}
                      alt=""
                    />
                  )}
                </div>
              </div>
              {/* this is form end */}
            </div>
            <div className={styles.moviePic}>
              <p>Special Movie</p>
              <img src={require("../../assets/jr/new/tv_icon.svg")} alt="" />
            </div>
          </section>

          {/* module4 */}
          <section className={styles.module4}>
            <div className={styles.header4}>
              <p>{props.t("What’s Welcome Suica?")}</p>
              <p>
                {props.t("An IC card for sightseeing visitors from abroad")}
              </p>
            </div>
            <div className={styles.top2Img}>
              <img
                src={require("../../assets/jr/new/section4_welcomesuica_image_pc.jpg")}
                alt=""
              />
            </div>
            <div className={styles.text4}>
              <section>
                <div className={styles.subHeader4}>
                  <span className={styles.subNumber}>1.</span>
                  <span className={styles.subHeaderText}>
                    <Trans i18nKey="Easy train and bus rides:">
                      Easy train and bus rides:
                      <br />
                      Walking through the gate
                      <br />
                      with a "peep" single touch
                    </Trans>
                  </span>
                </div>
                <div className={styles.subContent}>
                  <p>
                    <Trans i18nKey="Just go through the gate by placing Welcome Suica">
                      Just go through the gate by placing Welcome Suica
                      <br />
                      over the card reader. It will be automatically charged.
                    </Trans>
                  </p>
                </div>
              </section>
              <section>
                <div className={styles.subHeader4}>
                  <span className={styles.subNumber}>2.</span>
                  <span className={styles.subHeaderText}>
                    <Trans i18nKey="Easy shopping">
                      Easy shopping:
                      <br />
                      Making payments with a single touch
                    </Trans>
                  </span>
                </div>
                <div className={styles.subContent}>
                  <p>
                    <Trans i18nKey="Suica can also be used for shopping">
                      Suica can also be used for shopping
                      <br />
                      at the stores with Suica mark.
                    </Trans>
                  </p>
                </div>
              </section>
              <section>
                <div className={styles.subHeader4}>
                  <span className={styles.subNumber}>3.</span>
                  <span className={styles.subHeaderText}>
                    <Trans i18nKey="Others">Others:</Trans>
                  </span>
                </div>
                <div className={styles.subContent}>
                  <p>
                    <Trans i18nKey="Reusable (rechargeable) function">
                      ・Reusable (rechargeable) function
                      <br />⇒ when the balance is not enough
                      <br />
                      You can charge on the ticket vending machines with Suica
                      mark.
                      <br />
                      ・No deposit needed
                      <br />
                      ・A card is valid for 28 days from the day you start using
                      it (the day you buy the card), and it is not reissuable
                      <br />
                      *The amount charged is not refundable
                    </Trans>
                  </p>
                </div>
              </section>
            </div>
          </section>
          <section className={styles.module5}>
            <p className={styles.header5}>
              <Trans i18nKey="Where to Buy">
                Where to Buy
                <br />
              </Trans>
            </p>
            <p className={styles.text5}>
              {props.t("JR EAST Travel Service Center")}
            </p>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Narita Airport Terminal 1 - alert" parent="p">
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      href="https://www.jreast.co.jp/e/customer_support/service_center.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Narita Airport Terminal 1
                    </a>
                    <br />
                    8:15 - 19:00, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Narita Airport Terminal 1")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans
                    i18nKey="Narita Airport Terminal 2·3 - alert"
                    parent="p"
                  >
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      href="https://www.jreast.co.jp/e/customer_support/service_center.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Narita Airport Terminal 2·3
                    </a>
                    <br />
                    8:15 - 20:00, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Narita Airport Terminal 2·3")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans
                    i18nKey="Haneda Airport International Terminal (Tokyo Monorail) - alert"
                    parent="p"
                  >
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_haneda.html"
                    >
                      Haneda Airport International Terminal (Tokyo Monorail)
                    </a>
                    <br />
                    6:45 - 20:00, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t(
                "Haneda Airport International Terminal (Tokyo Monorail)"
              )}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Tokyo Station - alert" parent="p">
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_tokyo.html?src=gnavi"
                    >
                      Tokyo Station
                    </a>
                    <br />
                    7:30 - 20:30, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Tokyo Station")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans
                    i18nKey="Shinjuku Station New South Gate - alert"
                    parent="p"
                  >
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_shinjuku.html"
                    >
                      Shinjuku Station New South Gate
                    </a>
                    <br />
                    8:00 – 19:00, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Shinjuku Station New South Gate")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans
                    i18nKey="Shinjuku Station East Exit - alert"
                    parent="p"
                  >
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_shinjuku.html"
                    >
                      Shinjuku Station East Exit
                    </a>
                    <br />
                    weekdays 9:00 - 18:00, weekends & holidays
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Shinjuku Station East Exit")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Shibuya Station - alert" parent="p">
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_shibuya.html"
                    >
                      Shibuya Station
                    </a>
                    <br />
                    10:00 – 18:30, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Shibuya Station")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Ikebukuro Station - alert" parent="p">
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_ikebukuro.html"
                    >
                      Ikebukuro Station
                    </a>
                    <br />
                    9:00 - 19:00, weekdays
                    <br />
                    9:00 - 17:00, weekends & holidays
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Ikebukuro Station")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Ueno Station - alert" parent="p">
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_ueno.html"
                    >
                      Ueno Station
                    </a>
                    <br />
                    8:30 - 19:00, weekdays
                    <br />
                    8:30 - 18:00, weekends & holidays
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Ueno Station")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Hamamatsucho Station - alert" parent="p">
                    + JR EAST Travel Service Center
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.jreast.co.jp/e/customer_support/service_center_hamamatsucho.html"
                    >
                      Hamamatsucho Station
                    </a>
                    <br />
                    8:00 – 15:30, every day of the year
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Hamamatsucho Station")}
            </div>
            <p className={styles.text5}>
              {props.t("Welcome Suica ticket vending machine")}
            </p>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans i18nKey="Narita Airport Station - alert" parent="p">
                    + Narita Airport Station
                    <br />
                    Depends on the train operation time
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Narita Airport Station")}
            </div>
            <div
              className={styles.item5}
              onClick={() =>
                alert(
                  "",
                  <Trans
                    i18nKey="Haneda Airport International Terminal - alert"
                    parent="p"
                  >
                    + Haneda Airport International Terminal
                    <br />
                    Depends on the train operation time
                  </Trans>,
                  [{ text: "×", onPress: () => {} }]
                )
              }
            >
              {props.t("Haneda Airport International Terminal")}
            </div>
          </section>
          <section className={styles.module6}>
            <p className={styles.header6}>
              {props.t("Promotion Terms and Conditions")}
            </p>
            <div className={styles.item6}>
              <p className={styles.subHeader6}>
                <span className={styles.number6}>1. </span>
                <span>{props.t("Campaign Participation")}</span>
              </p>
              <div className={styles.subContent6}>
                <p>
                  {props.t(
                    "(1) Please make your campaign entry through this promotion website."
                  )}
                </p>
                <p>
                  {props.t(
                    "(2) By participating in this promotion, you agree to these terms and conditions."
                  )}
                </p>
              </div>
            </div>
            <div className={styles.item6}>
              <p className={styles.subHeader6}>
                <span className={styles.number6}>2. </span>
                <span>{props.t("Reception of the campaign reward")}</span>
              </p>
              <div className={styles.subContent6}>
                <p>
                  {props.t(
                    "You will receive the campaign reward by showing the successful campaign entry screen to the hotel staff after completing your entry to this promotion. There are limited supplies of rewards so the offer is only valid while supplies last."
                  )}
                </p>
              </div>
            </div>
            <div className={styles.item6}>
              <p className={styles.subHeader6}>
                <span className={styles.number6}>3. </span>
                <span>
                  {props.t("Handling of Welcome Suica related information")}
                </span>
              </p>
              <div className={styles.subContent6}>
                <p>
                  {props.t(
                    "The information related to Welcome Suica will be used for this promotion as follows by the users defined in item (3) : the users will not disclose or provide your information to any third parties except to the scope of users described in (3), without your consent (except when they are obliged to comply with the law)."
                  )}
                </p>
                <p>{props.t("(1) Purpose of data collection")}</p>
                <p>
                  {props.t("Marketing research and other research and studies")}
                </p>
                <p>{props.t("(2) Data to be used")}</p>
                <p>
                  {props.t(
                    "Your Welcome Suica ID number, Welcome Suica usage record during the promotion (including date and time of use, shops, amount paid, etc.)"
                  )}
                </p>
                <p>{props.t("(3) Users")}</p>
                <p>
                  {props.t(
                    "East Japan Railway Company and their business partners"
                  )}
                </p>
              </div>
            </div>
            <div className={styles.item6}>
              <p className={styles.subHeader6}>
                <span className={styles.number6}>4. </span>
                <span>
                  {props.t(
                    "The users may use the information related to this promotion for marketing research and other research and studies in the form of statistical information without identifying any individuals."
                  )}
                </span>
              </p>
            </div>
            <div className={styles.item6}>
              <p className={styles.subHeader6}>
                <span className={styles.number6}>※ </span>
                <span>
                  {props.t(
                    "The English version of this “Terms and Conditions” is for reference and convenience only. The Japanese language shall be controlling in all respects."
                  )}
                </span>
              </p>
            </div>
          </section>
        </div>
      )}

      {/* thanks page */}
      {!props.wrong && props.num !== 0 && props.success && (
        // {true && (
        <div className={styles.suicaThx}>
          <div className={styles.headerThx}>
            <div className={styles.thxBg}>
              <img
                src={require("../../assets/jr/new/section2_concept_bg_w375_sp.png")}
                alt=""
              />
            </div>
            <div className={styles.thxHeaderText}>
              <p className={styles.thxTextHeader}>{props.t("Thank you!")}</p>
              <img src={require("../../assets/jr/new/star.svg")} alt="" />
              <p>
                {props.t(
                  "Please show this screen to the hotel front to receive premium goods."
                )}
              </p>
            </div>
          </div>

          <div className={styles.jrThxForm}>
            <p className={styles.jrThxSurveySubtitle}>
              {props.t("Consumer Feedback Survey")}
            </p>
            <p className={styles.jrThxSurveyTex}>
              {props.t("Let us hear your voice. (Only 2 min)")}
            </p>
            <div className={styles.iframeContainer}>
              <iframe
                title="survey"
                width="310"
                height="265"
                frameBorder="0"
                allowtransparency="true"
                src="https://www.surveymonkey.com/r/XHXXGPH?embedded=1"
              />
            </div>
          </div>
        </div>
      )}

      {/* page */}
      <div className={styles.footer}>
        <img
          className={styles.footerBgImg}
          src={require("../../assets/jr/new/bg_footer.svg")}
          alt=""
        />
        <div className={styles.topFooter}>
          <img
            src={require("../../assets/jr/new/section6_footer_logo.png")}
            alt=""
          />
          <p>{props.t("Contact us")}</p>
          <p>
            <a href="tel:050-3185-3500">{props.t("Tel")}: 050-3185-3500</a>
          </p>

          <p>{props.t("Business hour")}: 09:00-18:00</p>
          <p>{props.t("* Japanese only")}</p>
        </div>
        <div className={styles.copyright}>
          2019 © hi Japan Co., Ltd. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

JR.propTypes = {};

function mapStateToProps(state) {
  return state.jr;
}

export default withTranslation()(connect(mapStateToProps)(JR));

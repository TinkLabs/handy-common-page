import React from "react";
import styles from "./station.scss";
import { Trans, withTranslation } from "react-i18next";
import { Modal } from "antd-mobile";
const alert = Modal.alert;

const Station = props => {
  return (
    <section className={`${styles.module5} ${props.className}`}>
      <p className={styles.header5}>
        <Trans i18nKey="Where to Buy">
          Where to Buy
          <br />
        </Trans>
      </p>
      <p className={styles.text5}>{props.t("JR EAST Travel Service Center")}</p>
      <div
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
        onClick={() =>
          alert(
            "",
            <Trans i18nKey="Narita Airport Terminal 2·3 - alert" parent="p">
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
        className={`${styles.item5} stationModalItem`}
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
        {props.t("Haneda Airport International Terminal (Tokyo Monorail)")}
      </div>
      <div
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
        onClick={() =>
          alert(
            "",
            <Trans i18nKey="Shinjuku Station New South Gate - alert" parent="p">
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
        className={`${styles.item5} stationModalItem`}
        onClick={() =>
          alert(
            "",
            <Trans i18nKey="Shinjuku Station East Exit - alert" parent="p">
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
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
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
        className={`${styles.item5} stationModalItem`}
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
  );
};

export default withTranslation()(Station);

import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Welcome to common-page!</h1>
      <ul className={styles.list}>
        <li>weather</li>
        <li>currency</li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);

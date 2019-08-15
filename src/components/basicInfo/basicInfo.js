import React from "react";
import PropTypes from "prop-types";
import styles from "./basicinfo.css";
import { connect } from "dva";
import { formatDate } from "../../utils/common";

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
    };
  }

  componentDidCatch(e) {
    //console.log("BasicInfo didcatch",e.message);
  }
  componentDidMount() {
    //console.log("BasicInfo props",this.props);
  }

  getDateInfo = () => {
    return (
      this.props.wdata.current.day +
      ", " +
      formatDate(this.props.wdata.current.date)
    );
  };

  render() {
    return (
      <ul className={styles.infolist}>
        <li className={styles.infoli}>
          <img
            className={styles.liimg}
            src={require("../../assets/icon/icon-action-calendar-today-24-px.svg")}
          />
          <span className={styles.licontent}>{this.getDateInfo()}</span>
        </li>
        <li className={styles.infoli}>
          <img
            className={styles.liimg}
            src={require("../../assets/icon/icon-communication-location-on-24-px.svg")}
          />
          <span className={styles.licontent}>{this.props.wdata.location}</span>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return state.weather;
}

export default connect(mapStateToProps)(BasicInfo);

import React from 'react';
import PropTypes from 'prop-types';
import styles from './jr.css';
import { connect } from 'dva';

const JR = (props) => {


  var onReturn = () => {
    console.log("back to some page");
  }

  var onValid = (data) => {
    props.dispatch({
      type:"jr/valid",
      payload:{num:data}
    })
  }

  return (
    <div>
        <div className={styles.jrbackground}>
          <img src="https://www.handy-japan.com/cp/jr/img/top_text.svg"></img>
        </div>

        <div className={styles.jrform}>
            <p className={styles.jrsubtitle}>Enter Welcome Suica Number here</p>

            <div>
            <input className={styles.number} type="text" name="name"></input>

            <input className={styles.btn} type="submit" value="OK"></input>
            </div>
            
        </div>

        <div className={styles.footer}>

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
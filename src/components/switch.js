import React from 'react';
import PropTypes from 'prop-types';
import styles from './switchbox.css';
import { connect } from 'dva';

const SwitchBox = (props) => {

console.log(props.temptype)
  return (
      <div className={styles.switchbox}>       
      {
        props.temptype == 1 ?
          <div>
            <div className={styles.switchon + ' ' + styles.switchleft} onClick={()=>props.onChange(1)}>℃</div>
            <div className={styles.switchoff + ' ' + styles.switchright} onClick={()=>props.onChange(2)}>℉</div>
          </div>
          :<div>
            <div className={styles.switchoff + ' ' + styles.switchleft} onClick={()=>props.onChange(1)}>℃</div>
            <div className={styles.switchon + ' ' + styles.switchright} onClick={()=>props.onChange(2)}>℉</div>
          </div>
      }      
      </div>
  );
};

SwitchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state.weather;
  }

export default connect(mapStateToProps)(SwitchBox);
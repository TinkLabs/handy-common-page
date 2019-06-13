import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from 'antd-mobile';
import styles from './topbar.css';
import { connect } from 'dva';

const TopBar = ({ onReturn }) => {
  return (
      <div>
        <NavBar
        className={styles.toptitlebar}
        mode="light"
        icon={<span className={styles.toptitlearrow}></span>}
        onLeftClick={() => onReturn()}
        ><span className={styles.toptitle}
        >Weather Forecast</span>
        </NavBar>
    </div>
  );
};

TopBar.propTypes = {
    onReturn: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return state;
  }

export default connect(mapStateToProps)(TopBar);
import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';
import styles from './WeatherPage.css';

const WeatherPage = () => {
  return (
    <div>
    <NavBar
      className={styles.toptitlebar}
      mode="light"
      icon={<span className={styles.toptitlearrow} ></span>}
      onLeftClick={() => console.log('onLeftClick')}
      rightContent={[
        // <Icon key="1" type="ellipsis" />,
      ]}
    ><span className={styles.toptitle}
    >Weather Forecast</span>
    </NavBar>
  </div>
  );
};

WeatherPage.propTypes = {
//     onDelete: PropTypes.func.isRequired,
//   products: PropTypes.array.isRequired,
};

export default WeatherPage;
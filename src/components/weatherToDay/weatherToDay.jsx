import React from 'react';
import dva, { connect } from 'dva';
import styles from './weathertoday.css';
import constants from '../../utils/constants';

class WeatherToDay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          foo:"bar"
        }
    }
    componentDidCatch(e) {
      console.log("WeatherToDay didcatch",e.message);
    }
    componentDidMount() {
        console.log("WeatherToDay props",this.props);
    }

    parseImgSrc = (code) => {
        return require("../../assets/weather/"+ constants.weathermap[code].trim());
    }

    getImgDesc = (code) => {
        return constants.weathermap[code].trim().split("_")[1].split('.')[0];
    }

    isC = () => (this.props.temptype == 1)

    render() {
        let current = this.props.wdata.current;
        let c = this.isC();
        return <div className={styles.weathertodaydiv}>
                    <div className={styles.weatherpicdiv}>
                        <img className={styles.weathermainimg} 
                        alt={this.getImgDesc(current.code)} 
                        src={this.parseImgSrc(current.code)}/>
                    </div>
                    <div className={styles.weathertempdiv}>
                        <span className={styles.weathertempnum}>
                        {
                            c ? current.temp_c:current.temp_f
                        }℃
                        </span>
                        <p className={styles.weatherrange}>
                        {
                            c ? current.low_c:current.low_f
                        }℃ ~ 
                        {
                            c ? current.high_c:current.high_f
                        }℃
                        </p>
                    </div>
                </div>
        }
}

function mapStateToProps(state) {
    const {wdata,temptype} = state.weather;
    return {
        wdata,
        temptype
    };
  }

export default connect(mapStateToProps)(WeatherToDay)
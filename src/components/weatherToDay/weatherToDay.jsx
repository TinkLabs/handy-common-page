import React from 'react';
import dva, { connect } from 'dva';
import styles from './weathertoday.css';

class WeatherToDay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          foo:"bar"
        }
    }
    componentDidCatch(e) {
      alert(e.message);
    }
    componentDidMount() {
        console.log("=========================",this.props);
      // throw new Error('a');
    }

    render() {
      return <div className={styles.weathertodaydiv}>
                <div className={styles.weatherpicdiv}>
                    <img className={styles.weathermainimg} src={require('../../assets/weather/28_Mostly Cloudy(day).svg')}/>
                </div>
                <div className={styles.weathertempdiv}>
                    <span className={styles.weathertempnum}>{
                        this.props.temptype == 1 ? 
                        this.props.wdata.current.temp_c:
                        this.props.wdata.current.temp_f
                    }℃</span>
                    <p className={styles.weatherrange}>
                    {
                        this.props.temptype == 1 ? 
                        this.props.wdata.current.low_c:
                        this.props.wdata.current.low_f
                    }℃ ~ 
                    {
                        this.props.temptype == 1 ? 
                        this.props.wdata.current.high_c:
                        this.props.wdata.current.high_f
                    }℃</p>
                </div>
            </div>
    }
}

function mapStateToProps(state) {
    const {wdata,temptype} = state.weather;
    return {
        wdata,temptype
    };
  }

export default connect(mapStateToProps)(WeatherToDay)
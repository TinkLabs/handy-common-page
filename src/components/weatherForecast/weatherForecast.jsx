import React from 'react';
import dva, { connect } from 'dva';
import styles from './weatherforecast.css';

class WeatherForecast extends React.Component {
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
      var tablehead = [];
      for (let i = 0;i<this.props.wdata.forecast.length;i++){
        tablehead.push(
          <td>{this.props.wdata.forecast[i].day}</td>
        )
      }
      return <div className={styles.weathertablediv}>
              <table className={styles.weathertable}>
              <tbody>
                <tr>
                  {tablehead}
                </tr>
                <tr>
                  <td><img className={styles.weathersubimg} src={require('../../assets/weather/12_Rain.svg')}/></td>
                  <td><img className={styles.weathersubimg} src={require('../../assets/weather/7_Mixed Snow And Sleet.svg')}/></td>
                  <td><img className={styles.weathersubimg} src={require('../../assets/weather/11_Showers.svg')}/></td>
                  <td><img className={styles.weathersubimg} src={require('../../assets/weather/23_Blustery.svg')}/></td>
                  <td><img className={styles.weathersubimg} src={require('../../assets/weather/4_Thunderstorms.svg')}/></td>
                </tr>
                <tr>
                <td className={styles.weathersubrange}>21~26℃</td>
                <td className={styles.weathersubrange}>21~26℃</td>
                <td className={styles.weathersubrange}>21~26℃</td>
                <td className={styles.weathersubrange}>21~26℃</td>
                <td className={styles.weathersubrange}>21~26℃</td>
                </tr>
                </tbody>
              </table>
            </div>
    }
}

function mapStateToProps(state) {
  const {wdata,temptype} = state.weather;
  return {
      wdata,temptype
  };
}

export default connect(mapStateToProps)(WeatherForecast)
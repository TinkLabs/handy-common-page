import React from 'react';
import dva, { connect } from 'dva';
import styles from './weatherforecast.css';
import constants from '../../utils/constants';

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          foo:"bar"
        }
    }
    componentDidCatch(e) {
      //console.log("WeatherForecast didcatch",e.message);
    }
    componentDidMount() {
      //console.log("WeatherForecast props",this.props);
    }

    parseImgSrc = (code) => {
      return require("../../assets/weather/"+ constants.weathermap[code].trim());
    }

    getImgDesc = (code) => {
        return constants.weathermap[code].trim().split("_")[1].split('.')[0];
    }

    isC = () => (this.props.temptype === 1)

    icon = () => (this.props.temptype === 1?'℃':'℉')
    
    render() {
      var tablehead = [];
      var tableimg = [];
      var tabledesc = [];
      let c = this.isC();
      let ic = this.icon();
      for (let i = 0;i<this.props.wdata.forecast.length;i++){
        let one = this.props.wdata.forecast[i];
        tablehead.push(
          <td key={'tablehead'+i}>{one.day}</td>
        )

        tableimg.push(
          <td key={'tableimg'+i}>
              <img className={styles.weathersubimg}
              alt={this.getImgDesc(one.code)}
              src={this.parseImgSrc(one.code)}/>
          </td>
        )

        tabledesc.push(
          <td key={'tabledesc'+i} className={styles.weathersubrange}>
            {c?one.low_c:one.low_f}~{c?one.high_c:one.high_f}{ic}
            </td>
        )
      }

      return <div className={styles.weathertablediv}>
              <table className={styles.weathertable}>
              <tbody>
                <tr>
                  {tablehead}
                </tr>
                <tr>
                  {tableimg}
                </tr>
                <tr>
                  {tabledesc}
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
import React from 'react';
import { connect } from 'dva';
import VConsole from 'vconsole'

class DebugIt extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        foo:"bar",
        count:0,
        show:false,
      }
  }

  countit = () => {
    if (!this.state.show && this.state.count>10){
      var vConsole = new VConsole();
      this.setState({show:true})
    }
    this.setState({count:this.state.count+1})
  }

  componentDidCatch(e) {
    //console.log("WeatherForecast didcatch",e.message);
  }
  componentDidMount() {
    //console.log("WeatherForecast props",this.props);
  }
  
  render() {
    return <div onClick={this.countit} style={{backgroundColor:'red',width:'100%',height:'8px'}}></div>
  }
}

export default connect()(DebugIt)
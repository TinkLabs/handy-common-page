import { connect } from 'dva';
import { Bling as GPT } from "react-gpt";

GPT.enableSingleRequest();
GPT.setTargeting("hotel_id", "3758");
GPT.setTargeting("campaign_id", "0");
class GPTPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    onLoad = () => {
        const adContainer = document.querySelector(this.props.parent);
        const iframe = adContainer.querySelector('iframe');
        if (!iframe) {
            return
        }

        iframe.contentWindow.document
            .getElementsByTagName('html')[0]
            .addEventListener(
                'click',
                () => {
                    console.log("click")
                },
                true
            );

        let aLink = iframe.contentWindow.document.querySelector('a');
        aLink.style[`-webkit-tap-highlight-color`] = 'rgba(255,255,255,0)';

        if (this.props.size[0] == this.props.target[0] &&
            this.props.size[1] == this.props.target[1]) {
            return
        }
        if (!this.props.target){
            return
        }
        let img = iframe.contentWindow.document.querySelector('amp-img');
        if (!img) {
            img = iframe.contentWindow.document.querySelector('img');
        }
        img.style.width = this.props.target[0] + 'px';
        img.style.height = this.props.target[1] + 'px';
    }

    render() {
        // console.log(this.props.parent)
        return (
            <div>
                <GPT
                    adUnitPath={this.props.path}
                    slotSize={this.props.size}
                    onSlotRenderEnded={this.onLoad}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
  }

export default connect(mapStateToProps)(GPTPanel)

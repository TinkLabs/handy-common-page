import * as React from "react";
import PropTypes from "prop-types";
// import mixpanel from '../../services/third-party/mixpanel';
import mixpanel from "../../utils/mixpanel";
import { getElementTop } from "../../utils/common";
import { getAdKeyValueFn } from "../../services/api";
import styles from "./index.less";

class AmpAD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GPTHasLoaded: false,
    };
    this.gptScrpt = void 0;
    this.adContainerRef = React.createRef();
    this.campaignId = void 0;
    this.currentNumber = void 0;
    this.adKeyValue = void 0;
  }

  static propTypes = {
    ADUnit: PropTypes.string,
    ADScreenName: PropTypes.string,
    ADModule: PropTypes.string,
  };

  static defaultProps = {
    ADUnit: "",
    ADScreenName: "",
    ADModule: "null",
  };

  // send ad request
  beginGPTsetup = async () => {
    // Let's destructure the cmd array out of GPT.
    let googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];

    // Feel free to get really paranoid here and check for Array-ness, too.
    googletag.cmd.push(() => this.setState({ GPTHasLoaded: true }));
    googletag.cmd.push(() => googletag.display(this.props.ADUnit));
    googletag.cmd.push(() =>
      googletag.pubads().addEventListener("slotRenderEnded", () => {
        this.ADslotRenderEnded();
      })
    );
    googletag.cmd.push(() =>
      googletag.pubads().addEventListener("slotOnload", () => {
        this.ADSlotOnload();
      })
    );
  };

  // ad ad amp script to html head
  async addGPTScript() {
    // init key value
    this.adKeyValue = await getAdKeyValueFn();
    console.log("##############", this.adKeyValue);
    window.streamampClientConfig = {
      targets: this.adKeyValue,
    };

    // if not load stream amp before
    if (!window.streamamp) {
      this.gptScrpt = document.createElement("script");
      this.gptScrpt.type = "text/javascript";
      this.gptScrpt.async = "async";
      this.gptScrpt.src =
        "https://static.amp.services/clients/handy-dfp/Handy.js";
      document.body.appendChild(this.gptScrpt);

      // when gpt script read, send ad request
      this.gptScrpt.addEventListener("load", this.beginGPTsetup);
    } else {
      this.beginGPTsetup();
    }
  }

  // ad load completely
  ADSlotOnload() {
    this.currentNumber = Math.ceil(
      getElementTop(this.adContainerRef.current) /
        document.documentElement.clientHeight
    );

    this.campaignId = this.adKeyValue.campaign_id;

    // mixpanel tracking
    mixpanel().track("Ads Image downloaded", {
      campaignid: this.campaignId,
      screen_name: this.props.ADScreenName,
      module: this.props.ADModule,
      position: 1,
      screen_number: this.currentNumber,
    });
  }

  // reset ad size as soon as possible
  ADslotRenderEnded() {
    // console.log("xxxxxxxxxxxxxxx",this.adContainerRef.current)
    const iframe = this.adContainerRef.current.querySelector("iframe");

    if (iframe) {
      this.adContainerRef.current.style.marginBottom = "24px";
      this.adContainerRef.current.style.height = "auto";
      // add google ad click event
      iframe.contentWindow.document
        .getElementsByTagName("html")[0]
        .addEventListener(
          "click",
          () => {
            mixpanel().track("Advertising Banner Click", {
              campaignid: this.campaignId,
              screen_name: this.props.ADScreenName,
              module: this.props.ADModule,
              position: 1,
              screen_number: this.currentNumber,
            });
          },
          true
        );
    }

    // if ad size is 360 just change it to 336
    if (iframe && iframe.width === "360") {
      let img = iframe.contentWindow.document.querySelector("amp-img");
      if (img) {
        iframe.width = 336;
        iframe.height = 196;
        img.style.width = "336px";
        img.style.height = "196px";
      }
    }
  }

  componentDidMount() {
    this.addGPTScript();
  }

  componentWillUnmount() {
    // avoid memory leak
    if (!window.streamamp) {
      this.gptScrpt.removeEventListener("load", this.beginGPTsetup);
    }
  }

  render() {
    const { ADUnit } = this.props;
    // console.log("this.pro",this.props)

    return (
      <section
        id="AmpAD"
        className={styles.adContainer}
        ref={this.adContainerRef}
      >
        {/* reload ad if lockscreen */}
        {this.state.GPTHasLoaded && <div id={ADUnit} />}
      </section>
    );
  }
}

export default AmpAD;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Route } from "dva/router";
import JR from "./JR.jsx";

const Campaign = () => {
  return <Route path="/suica" component={JR} />;
};

export default connect()(Campaign);

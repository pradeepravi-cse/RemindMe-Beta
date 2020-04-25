import ReactDOM from "react-dom";
import React from "react";

import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "./theme.less";
import "./index.scss";

function start() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
start();

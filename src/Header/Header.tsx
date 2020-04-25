import React, { Component } from "react";
import moment from "moment";

import "./Header.scss";

interface State {
  time: Date;
}

export class Header extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  render() {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="title">RemindMe</h1>
        <span>{moment(this.state.time).format("LLLL")}</span>
      </div>
    );
  }
}

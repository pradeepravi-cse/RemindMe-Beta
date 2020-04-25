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
  componentDidMount() {
    setInterval(() => this.setState({ time: new Date() }), 1000);
  }
  render() {
    return (
      <div className="">
        <h1 className="title m-0">RemindMe</h1>
        <span>{moment(this.state.time).format("LLLL")}</span>
      </div>
    );
  }
}

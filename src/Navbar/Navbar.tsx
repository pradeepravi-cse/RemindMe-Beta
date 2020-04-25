import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { withRouter } from "react-router";

import "./Navbar.scss";

interface props {
  location: { pathname: "string" };
  todo: number;
  completed: number;
}

class Navbar extends Component<props> {
  render() {
    const Links = [
      { to: "/ToDo", label: "ToDo", count: this.props.todo },
      { to: "/Completed", label: "Completed", count: this.props.completed },
    ];

    console.log(this.props);
    return (
      <ul className="NavBar">
        {Links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className={
                this.props.location.pathname.includes(link.label)
                  ? "NavBar--item active"
                  : "NavBar--item"
              }
            >
              {link.label}
              {!this.props.location.pathname.includes(link.label) && (
                <Badge
                  count={link.count}
                  className="ml-1"
                  style={{ backgroundColor: "#8280ff" }}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default withRouter(Navbar);

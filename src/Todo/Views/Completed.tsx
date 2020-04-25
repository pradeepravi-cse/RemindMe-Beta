import React, { Component } from "react";
import * as _ from "lodash";
import { Moment } from "moment";
import { ListItrator } from "../Components/ListItrator/ListItrator";
import NoRemider from "./NoRemider";
interface props {
  completed: { id: number; reminder: string; date: Moment; done: boolean }[];
}
export class Completed extends Component<props> {
  handleAction = (id, type) => {
    const Todos = JSON.parse(localStorage.getItem("ToDo"));
    if (type === "delete") {
      _.remove(Todos, { id: id });
    }
    localStorage.setItem("ToDo", JSON.stringify(Todos));
  };
  render() {
    if (_.isEmpty(this.props.completed)) {
      return (
        <NoRemider
          message={
            <p className="mt-3 text-nodata">
              You don't have completed reminder!
              <br />
              <small>Complete the remider by clicking Done on Reminder</small>
            </p>
          }
        />
      );
    }
    return (
      <ListItrator
        data={this.props.completed}
        showAction={true}
        actionFor="Completed"
        handleAction={this.handleAction}
      />
    );
  }
}

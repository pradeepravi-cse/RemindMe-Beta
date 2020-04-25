import React, { Component } from "react";
import * as _ from "lodash";
import NoRemider from "./NoRemider";
import { Moment } from "moment";
import { ListItrator } from "../Components/ListItrator/ListItrator";
interface ToDo {
  id: number;
  reminder: string;
  date: Moment;
  done: boolean;
}
interface Props {
  todos: ToDo[];
}
export class Todo extends Component<Props, any> {
  handleAction = (id, type) => {
    const Todos = JSON.parse(localStorage.getItem("ToDo"));
    if (type === "update") {
      _.map(Todos, (todo: ToDo) => {
        if (todo.id === id) {
          todo.done = true;
        }
      });
    }
    if (type === "delete") {
      _.remove(Todos, { id: id });
    }
    localStorage.setItem("ToDo", JSON.stringify(Todos));
  };

  render() {
    if (_.isEmpty(this.props.todos)) {
      return (
        <NoRemider
          message={
            <p className="mt-3 text-nodata">
              You have no reminders!
              <br />
              <small>Create something above</small>
            </p>
          }
        />
      );
    }
    return (
      <ListItrator
        data={this.props.todos}
        showAction={true}
        actionFor="ToDo"
        handleAction={this.handleAction}
      />
    );
  }
}

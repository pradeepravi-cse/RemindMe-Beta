import React, { Component } from "react";
import * as _ from "lodash";
import { Header } from "./Header/Header";
import { AddToDo } from "./Todo/Components/AddToDo";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Todo } from "./Todo/Views/Todo";
import { Completed } from "./Todo/Views/Completed";
import Navbar from "./Navbar/Navbar";
import { Moment } from "moment";
interface state {
  todos: { id: number; reminder: string; date: Moment; done: boolean }[];
}
export default class App extends Component<any, state> {
  constructor(props) {
    super(props);
    this.state = {
      todos: localStorage.getItem("ToDo")
        ? JSON.parse(localStorage.getItem("ToDo"))
        : [],
    };
  }
  componentDidMount() {
    var originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      var event = new Event("itemInserted");
      event.value = value;
      document.dispatchEvent(event);
      originalSetItem.apply(this, arguments);
    };

    document.addEventListener(
      "itemInserted",
      (e) => this.setState({ todos: JSON.parse(e.value) }),
      false
    );
  }
  render() {
    window.addEventListener(
      "storage",
      function (e) {
        // do your checks to detect
        console.log(e);
        // changes in "e1", "e2" & "e3" here
      },
      false
    );
    const Todos = _.filter(this.state.todos, (Todo) => Todo.done === false);
    const completed = _.filter(this.state.todos, (Todo) => Todo.done === true);
    return (
      <div className="container my-5">
        <Header />
        <AddToDo />
        <div className="my-5">
          <Router>
            <Navbar todo={Todos.length} completed={completed.length} />
            <Switch>
              <Redirect path="/" to="ToDo" exact />
              <Route path="/ToDo">
                <Todo todos={Todos} />
              </Route>
              <Route path="/Completed">
                <Completed completed={completed} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Input, DatePicker, Button } from "antd";
import moment, { Moment } from "moment";

interface State {
  reminder: string;
  date: Moment;
}

export class AddToDo extends Component<any, State> {
  constructor(props) {
    super(props);
    this.state = { reminder: "", date: moment(new Date()) };
  }

  render() {
    const saveToStorage = () => {
      const ToDo = JSON.parse(localStorage.getItem("ToDo"));
      if (this.state.reminder !== "") {
        console.log("hit");
        if (ToDo) {
          console.log(ToDo);
          const length = ToDo.length;

          localStorage.setItem(
            "ToDo",
            JSON.stringify([
              ...ToDo,
              {
                id: length + 1,
                reminder: this.state.reminder,
                date: this.state.date,
                done: false,
              },
            ])
          );
        } else {
          localStorage.setItem(
            "ToDo",
            JSON.stringify([
              {
                id: 1,
                reminder: this.state.reminder,
                date: this.state.date,
                done: false,
              },
            ])
          );
        }
      }
      this.setState({ reminder: "", date: moment(new Date()) });
    };

    return (
      <div className="row">
        <div className="col-10 d-flex">
          <Input
            placeholder="What do you need to do?"
            onChange={(e) =>
              this.setState({ ...this.state, reminder: e.target.value })
            }
            style={{ width: "80%" }}
            value={this.state.reminder}
          />
          <DatePicker
            onChange={(e) => this.setState({ ...this.state, date: e })}
            showTime={true}
            defaultValue={this.state.date}
            format="DD MMM YYYY hh:mm A"
          />
        </div>
        <div className="col-2 text-right">
          <Button
            type="primary"
            className="Button Button--Primary"
            onClick={saveToStorage}
          >
            Add new
          </Button>
        </div>
      </div>
    );
  }
}

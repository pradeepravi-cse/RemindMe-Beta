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
    console.log(this.state);
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
        <div className="col-12 col-md-10 d-flex my-2">
          <Input
            placeholder="What do you need to do?"
            onChange={(e) =>
              this.setState({ ...this.state, reminder: e.target.value })
            }
            value={this.state.reminder}
          />
          <DatePicker
            onChange={(e) => this.setState({ ...this.state, date: e })}
            className="d-none d-md-block"
            showTime={true}
            defaultValue={this.state.date}
            style={{ width: "25%" }}
            disabledDate={(current) => {
              return current && current < moment();
            }}
            format="DD MMM YYYY hh:mm A"
          />
        </div>
        <div className="col col-md-2 my-2 d-flex justify-content-between">
          <DatePicker
            onChange={(e) => this.setState({ ...this.state, date: e })}
            className="d-block d-md-none w-50"
            showTime={true}
            defaultValue={this.state.date}
            disabledDate={(current) => {
              return current && current <= moment();
            }}
            format="DD MMM YYYY hh:mm A"
          />
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

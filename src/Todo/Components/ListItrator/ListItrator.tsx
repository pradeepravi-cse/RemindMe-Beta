import React, { Component } from "react";
import * as _ from "lodash";
import moment, { Moment } from "moment";
import { List, Button } from "antd";
import { Trash } from "react-feather";

import "./ListItrator.scss";

interface props {
  data: { id: number; reminder: string; date: Moment; done: boolean }[];
  showAction: boolean;
  actionFor: string;
  handleAction: (id: number, type: string) => void;
}

export class ListItrator extends Component<props> {
  render() {
    if (_.isEmpty(this.props.data)) {
      return null;
    }
    return (
      <List
        dataSource={this.props.data}
        renderItem={(item) => (
          <List.Item
            actions={
              this.props.showAction
                ? this.props.actionFor === "ToDo"
                  ? [
                      <Button
                        type="primary"
                        onClick={() =>
                          this.props.handleAction(item.id, "update")
                        }
                      >
                        Done
                      </Button>,
                      <Trash
                        color="#ff7285"
                        onClick={() =>
                          this.props.handleAction(item.id, "delete")
                        }
                      />,
                    ]
                  : [
                      <Trash
                        color="#ff7285"
                        onClick={() =>
                          this.props.handleAction(item.id, "delete")
                        }
                      />,
                    ]
                : []
            }
          >
            <List.Item.Meta
              title={item.reminder}
              description={moment(item.date).format("DD MMM YYYY hh:mm a")}
            />
          </List.Item>
        )}
      />
    );
  }
}

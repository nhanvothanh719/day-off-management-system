import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Button, Card, message } from "antd";
import "./Groups.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";
import {
  EditFilled,
  DeleteFilled
} from '@ant-design/icons';

const Groups = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [groups, setGroups] = useState([]);

  const handleOnClick = (key, id, record) => {
    switch (key) {
      case "detail":
        navigate(`/manager/groups/${id}`, { state: { record } });
        break;
      case "new-group":
        navigate("/manager/groups/new-group");
        break;
      case "delete": 
        axiosClient.delete("/groups/" + id)
        .then(() => {
          setGroups(groups.filter((group) => group.id !== id));
          messageApi.open({
            type: "success",
            content: "Delete group successfully!",
          });
        })
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axiosClient
      .get("/groups/")
      .then((response) => {
        setGroups(response.data.groups);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Card title="ALL GROUPS" bordered={false} className="groups-table">
      {contextHolder}
      <Button
        className="groups-table-button"
        onClick={() => handleOnClick("new-group")}
        style ={{marginBottom: "10px"}}
      >
        + New Group
      </Button>

      <Table dataSource={groups} className="groups">
        <Table.Column title="Name" dataIndex="name" key="name" />

        <Table.Column
          title="Staff(s)"
          dataIndex="staffs"
          key="staffs"
          render={(staffs) => (
            <>
              {staffs.map(({_id, name}) => (
                <Tag key={_id}>{name}</Tag>
              ))}
            </>
          )}
        />

        <Table.Column
          title="Master(s)"
          dataIndex="masters"
          key="masters"
          render={(masters) => (
            <>
              {masters.map(({_id, name}) => (
                <Tag key={_id}>{name}</Tag>
              ))}
            </>
          )}
        />

        <Table.Column
          title="Action"
          key="action"
          render={(_, group) => (
            <Space size="small">
              <Button
                className="groups-table-btn edit-button"
                onClick={() => {
                  handleOnClick("detail", group.id, group);
                }}
              >
                <EditFilled />
              </Button>

              <Button
                className="groups-table-btn delete-button"
                onClick={() => {
                  handleOnClick("delete", group.id, group);
                }}
              >
                <DeleteFilled />
              </Button>
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};

export default Groups;

import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import MyCard from "../Card/Card";
import {
  Avatar,
  Button,
  Popover,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";

const Workspaces = () => {
  const navigate = useNavigate();
  const [dataWorkspaces, setDataWorkspaces] = useState();
  const success = () => {
    message.success("Delete workspace successfully");
  };
  const fetchWP = () => {
    axiosClient.get("/workspace").then((res) => {
      setDataWorkspaces(
        res.data.workspace.map((workspace, index) => {
          return {
            key: index + 1,
            id: workspace._id,
            name: workspace.workspace_name,
            status: [workspace.status],
            manager: workspace.manager_id,
          };
        })
      );
    });
  };
  useEffect(() => {
    fetchWP();
  }, []);

  const handleRowClick = (record) => {
    navigate(`/administrator/workspaces/${record.key}/detail`, {
      state: { record },
    });
  };

  const handleDeleteWP = (record) => {
    axiosClient.delete(`/workspace/${record.id}`).then((res) => {
      fetchWP();
      success();
    });
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 200,
      align: "center",
      render: (_, { status }) => (
        <>
          {status?.map((tag) => {
            let color = tag === "false" ? "red" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag === "false" ? "INACTIVE" : "ACTIVE"}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Manager",
      key: "manager",
      dataIndex: "manager",
      render: (_, { manager }) => (
        <>
          {manager?.map((tag) => {
            return (
              <Avatar.Group>
                <Tooltip title={tag?.username} placement="top">
                  <Avatar
                    style={{
                      backgroundColor: getRandomColor(),
                    }}
                  >
                    {tag?.username?.charAt(0)}
                  </Avatar>
                </Tooltip>
              </Avatar.Group>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space direction="horizontal">
            <Popover
              getPopupContainer={(trigger) => trigger.parentElement}
              content={
                <Button
                  onClick={() => handleDeleteWP(record)}
                  className="save-btn-wp"
                >
                  Submit
                </Button>
              }
              title="Are you sure ?"
              trigger="click"
            >
              <DeleteOutlined
                style={{ fontSize: "21px", color: "red", cursor: "pointer" }}
              />
            </Popover>

            <InfoCircleOutlined
              style={{ fontSize: "21px", color: "green", cursor: "pointer" }}
              onClick={() => handleRowClick(record)}
            />
          </Space>
        </>
      ),
    },
  ];

  const tableComponent = (
    <>
      <Table columns={columns} dataSource={dataWorkspaces} />
    </>
  );
  return (
    <MyCard
      title="Workspaces"
      content={tableComponent}
      extra={
        <Button
          type="primary"
          style={{
            borderRadius: "8px",
            height: "40px",
            fontWeight: "500",
            fontSize: "16px ",
            backgroundColor: "#ea7a9a",
            border: "none",
          }}
          onClick={() => navigate("/administrator/workspaces/new")}
        >
          + New Workspaces
        </Button>
      }
    ></MyCard>
  );
};

export default Workspaces;

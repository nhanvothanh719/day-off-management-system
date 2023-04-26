import { KeyOutlined, UserDeleteOutlined } from "@ant-design/icons";

import {
  Button,
  Input,
  Popover,
  Space,
  Switch,
  Table,
  Typography,
  message,
  Modal,
  Select,
} from "antd";
import MyCard from "../Card/Card";
import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import axiosClient from "../../utils/clientAxios";
import "./Workspaces.scss";

const WorkspacesDetail = () => {
  const location = useLocation();
  const [users, setUsers] = useState();
  const [dataWP, setDataWP] = useState();
  const [dataManager, setDataManager] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [preManagers, setPreManagers] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    axiosClient
      .put(`/workspace/${location?.state?.record.id}`, {
        manager_id: managers,
      })
      .then((res) => {
        fetchWpDetail();
        successAddManager();
        setPreManagers(managers);
      })
      .catch((error) => {
        setManagers(preManagers);
        errorUpdateManager(error.response.data.message);
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setManagers(preManagers);
  };
  const addManager = (id) => {
    setManagers([...managers, id]);
  };

  const removeManager = (managerId) => {
    setManagers(managers.filter((manager) => manager !== managerId));
  };
  const success = () => {
    message.success("Reset password successfully");
  };
  const successRemove = () => {
    message.success("Remove manager successfully");
  };
  const successStatus = () => {
    message.success("Change status successfully");
  };
  const successAddManager = () => {
    message.success("Add Manager successfully");
  };
  const errorUpdateManager = (mess) => {
    message.error(`${mess}`);
  };

  const fetchWpDetail = () => {
    axiosClient.get(`/workspace/${location?.state?.record.id}`).then((res) => {
      setDataWP(res.data.workspace);
      setManagers(
        res?.data?.workspace?.manager_id.map((data, index) => {
          return data._id;
        })
      );
      setPreManagers(
        res?.data?.workspace?.manager_id.map((data, index) => {
          return data._id;
        })
      );
      setDataManager(
        res?.data?.workspace?.manager_id.map((data, index) => {
          return {
            key: index + 1,
            id: data._id,
            name: data.username,
            email: data.email,
            workspaceId: location?.state?.record.id,
          };
        })
      );
    });
  };
  useEffect(() => {
    axiosClient.get("/users").then((res) => {
      setUsers(res.data);
    });
    fetchWpDetail();
  }, []);

  const handleStatus = (boolean) => {
    axiosClient
      .put(`/workspace/${location?.state?.record.id}`, {
        manager_id: location?.state?.record.manager,
        status: boolean,
      })
      .then((res) => {
        fetchWpDetail();
        successStatus();
      });
  };

  const handleResetPassword = (record) => {
    axiosClient.post(`/auth/resetPass/${record.id}`).then((res) => {
      success();
    });
  };

  const handleRemoveManager = (record) => {
    const dataTest = managers.filter((manager) => manager !== record.id);
    const dataManager = dataTest.map((manager) => {
      return manager;
    });
    axiosClient
      .put(`/workspace/${record.workspaceId}`, {
        manager_id: dataManager,
      })
      .then((res) => {
        fetchWpDetail();
        successRemove();
      })
      .catch((error) => {
        errorUpdateManager(error.response.data.message);
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 300,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
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
                  onClick={() => handleResetPassword(record)}
                  className="save-btn-wp"
                >
                  Submit
                </Button>
              }
              title="Are you sure ?"
              trigger="click"
            >
              <KeyOutlined
                style={{ fontSize: "24px", color: "green", cursor: "pointer" }}
              />
            </Popover>
            <Popover
              getPopupContainer={(trigger) => trigger.parentElement}
              content={
                <Button
                  onClick={() => handleRemoveManager(record)}
                  className="save-btn-wp"
                >
                  Submit
                </Button>
              }
              title="Are you sure ?"
              trigger="click"
            >
              <UserDeleteOutlined
                style={{ fontSize: "24px", color: "red", cursor: "pointer" }}
              />
            </Popover>
          </Space>
        </>
      ),
    },
  ];
  const WPManager = <Table columns={columns} dataSource={dataManager} />;
  const WPDetail = (
    <>
      {dataWP && (
        <>
          <Space direction="vertical">
            <Space>
              <Typography.Text className="text-title-wp">Name</Typography.Text>
              <Input disabled defaultValue={dataWP?.workspace_name}></Input>
            </Space>
            <Space>
              <Typography.Text className="text-title-wp">
                Status
              </Typography.Text>
              <Switch
                defaultChecked={dataWP.status === "false" ? false : true}
                onChange={handleStatus}
              />
            </Space>
          </Space>

          <MyCard
            title={"Manager"}
            content={WPManager}
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
                onClick={showModal}
              >
                + New Manager
              </Button>
            }
          />
        </>
      )}
      <Modal
        title="Add manager to workspace"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Text className="text-title-wp">Manager</Typography.Text>

        <Select
          mode="multiple"
          style={{ width: "100%" }}
          value={managers}
          onDeselect={removeManager}
          onSelect={addManager}
        >
          {users &&
            users.map((user) => (
              <Select.Option key={user._id} value={user._id}>
                {user.username}
              </Select.Option>
            ))}
        </Select>
      </Modal>
    </>
  );
  return <MyCard title="Workspaces Detail" content={WPDetail}></MyCard>;
};
export default WorkspacesDetail;

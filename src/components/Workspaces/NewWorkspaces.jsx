import {
  Button,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Typography,
  message,
} from "antd";
import MyCard from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../utils/clientAxios";
import "./Workspaces.scss";

const NewWorkspaces = () => {
  const [users, setUsers] = useState();
  const [nameWorkspaces, setNameWorkspaces] = useState();
  const [managers, setManagers] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const success = () => {
    message.success("Created new workspace successfully");
  };

  const errorNameWP = () => {
    message.error("Field workspace name can't empty !");
  };

  const errorManager = () => {
    message.error("Need at least one manager in the workspace !");
  };

  useEffect(() => {
    axiosClient.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const addManager = (id) => {
    setManagers([...managers, id]);
  };

  const removeManager = (managerId) => {
    setManagers(managers.filter((manager) => manager !== managerId));
  };

  const changeStatus = (data) => {
    setStatus(data);
  };

  const handleCreateWorkspaces = () => {
    if (nameWorkspaces !== undefined && managers.length > 0) {
      axiosClient
        .post("/workspace/createWorkspace", {
          workspace_name: nameWorkspaces,
          description: "123",
          status: status,
          manager_id: managers,
        })
        .then((res) => {
          navigate("/administrator/workspaces");
          success();
        });
    } else {
      if (nameWorkspaces === undefined) {
        errorNameWP();
      } else {
        errorManager();
      }
    }
  };

  const addWorkspaces = (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Typography.Text className="text-title-wp">Name</Typography.Text>
        <Input onChange={(e) => setNameWorkspaces(e.target.value)}></Input>
        <Typography.Text className="text-title-wp">Manager</Typography.Text>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
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
        <Typography.Text className="text-title-wp">Status</Typography.Text>
        <Switch defaultChecked={false} onChange={changeStatus} />
      </Space>
      <Row
        style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <Button className="create-workspaces" onClick={handleCreateWorkspaces}>
          Create new workspaces
        </Button>
      </Row>
    </>
  );
  return <MyCard title="New Workspaces" content={addWorkspaces}></MyCard>;
};
export default NewWorkspaces;

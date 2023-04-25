import React, { useEffect, useState } from "react";
import {
  Space,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Input,
  Select,
  message,
  Tag,
} from "antd";
import "./NewGroup.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";

const GroupDetail = (props) => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [groupMasters, setGroupMasters] = useState([]);
  const [groupStaffs, setGroupStaffs] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [staffs, setStaffs] = useState([]);

  const findNameById = (id) => {
    const staff = staffs.find((master) => master._id === id);
    return staff ? staff.name : "";
  };

  const staffTagRender = (props) => {
    const { value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const name = findNameById(value);

    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
      >
        {name}
      </Tag>
    );
  };

  const addNewMaster = (staffId) => {
    setGroupMasters([
      ...groupMasters,
      { _id: staffId, name: findNameById(staffId) },
    ]);
    setGroupStaffs(groupStaffs.filter((staff) => staff._id !== staffId));
  };

  const removeMaster = (masterId) => {
    setGroupStaffs([
      ...groupStaffs,
      { _id: masterId, name: findNameById(masterId) },
    ]);
    setGroupMasters(groupMasters.filter((master) => master._id !== masterId));
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  useEffect(() => {
    async function getAllStaffs() {
      try {
        const response = await axiosClient.get("/users/get-all-staffs");
        setStaffs(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllStaffs();
  }, []);

  const addGroupStaff = (staffId) => {
    setGroupStaffs([
      ...groupStaffs,
      { _id: staffId, name: findNameById(staffId) },
    ]);
  };

  const createNewGroup = () => {
    if(groupName.length > 3) {
      const group = {
        name: groupName,
        staffs_id: groupStaffs.map((staff) => staff._id),
        masters_id: groupMasters.map((master) => master._id),
      };
      axiosClient.post("/groups/", group).then((res) => {
        console.log(res);
        if(res.data.success) {
          messageApi.open({
            type: "success",
            content: 'Create new group successfully',
        });
        navigate('/manager/groups');
        }
      });
    } else {
      messageApi.open({
        type: "error",
        content: 'Group name is not appropriate!',
    });
    }
  };

  const resetAll = () => {
    setGroupName("");
    setGroupMasters([]);
    setGroupStaffs([]);
  };

  return (
    <Card className="card-container-new-group" title="Basic Information">
      {contextHolder}
      <Space direction="vertical" size={20} style={{ width: "100%" }}>
        <Row gutter={[0, 12]}>
          <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
            <Typography.Text style={{ color: "black", fontWeight: "500" }}>
              Name
            </Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
            <Input onChange={handleGroupNameChange} value={groupName} />
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
            <Typography.Text style={{ color: "black", fontWeight: "500" }}>
              Masters
            </Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              value={groupMasters.map(({ _id }) => _id)}
              tagRender={staffTagRender}
              onDeselect={removeMaster}
              onSelect={addNewMaster}
            >
              {groupStaffs.map((staff) => (
                <Select.Option key={staff._id} value={staff._id}>
                  {staff.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
            <Typography.Text style={{ color: "black", fontWeight: "500" }}>
              Members
            </Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              value={groupStaffs.map(({ _id }) => _id)}
              onSelect={addGroupStaff}
              tagRender={staffTagRender}
            >
              {staffs.map((staff) => (
                <Select.Option key={staff._id} value={staff._id}>
                  {staff.name}
                </Select.Option>
              ))}
            </Select>

            <Button className="canel-btn" onClick={createNewGroup}>
              Create new group
            </Button>

            <Button onClick={resetAll}>Clear</Button>
          </Col>
        </Row>
      </Space>
    </Card>
  );
};
export default GroupDetail;

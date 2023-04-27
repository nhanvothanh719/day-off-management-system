import React, { useState, useEffect } from "react";
import {
  Space,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Input,
  Select,
  Modal,
  Tag,
  message
} from "antd";
import "./GroupDetail.scss";
import { useParams } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";
import withAuthorization from "../../utils/withAuthorization";
import { user_permission } from "../../const/permission";

const GroupDetail = () => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const [groupMasters, setGroupMasters] = useState([]);
  const [groupStaffs, setGroupStaffs] = useState([]);
  const [groupName, setGroupName] = useState("");

  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const findNameById = (id) => {
    const staff = staffs.find((master) => master._id === id);
    return staff ? staff.name : '';
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

  const addNewMember = () => {
    selectedMemberId &&
      axiosClient
        .put("/groups/add-group-staff", {
          staff_id: selectedMemberId,
          group_id: id,
        })
        .then((res) => {
          setGroupStaffs(res.data.staffs);
          messageApi.open({
            type: "success",
            content: 'Add new member successfully',
        });
        })
        .catch((error) => {
            messageApi.open({
                type: "error",
                content: 'This staff is already a group member!',
            });
        })
        setOpenModal(false);
  };

  const addNewMaster = (staffId) => {
    setGroupMasters([...groupMasters, {_id: staffId, name: findNameById(staffId)}]);
    setGroupStaffs(groupStaffs.filter((staff) => staff._id !== staffId));
  }

  const removeMaster = (masterId) => {
    setGroupStaffs([...groupStaffs, {_id: masterId, name: findNameById(masterId)}]);
    setGroupMasters(groupMasters.filter((master) => master._id !== masterId));
  }

  const removeMember = (value) => {
    axiosClient
      .put("/groups/remove-group-staff", { staff_id: value, group_id: id })
      .then((res) => {
        setGroupStaffs(res.data.staffs);
        messageApi.open({
            type: "success",
            content: 'Remove member successfully',
        });
    });
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  }

  const updateGroup = (event) => {
    const updatedGroup = {
        name: groupName,
        staffs_id: groupStaffs.map((staff) => staff._id),
        masters_id: groupMasters.map((master) => master._id),
    }
    if(groupName.length <= 0) {
      messageApi.open({
        type: "error",
        content: 'Name of group is required!',
    });
    } else {
      axiosClient.put("/groups/" + id, updatedGroup).then((res) => {
        if(res.data.success) {
            messageApi.open({
                type: "success",
                content: 'Update group details successfully',
            });
        }
    })
    }
  }

  useEffect(() => {
    async function getGroupInfo() {
      try {
        const response = await axiosClient.get(`/groups/${id}`);
        setGroupName(response.data.name);
        setGroupStaffs(response.data.staffs);
        setGroupMasters(response.data.masters);
      } catch (error) {
        console.error(error);
      }
    }

    async function getAllStaffs() {
      try {
        const response = await axiosClient.get("users/get-all-staffs");
        setStaffs(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllStaffs();
    getGroupInfo();
  }, [id]);

  return (
    <Card
      className="card-container-group-detail"
      title={`Group Details`}
      extra={
        <Button className="group-detail-btn" onClick={() => setOpenModal(true)}>
          + New Member
        </Button>
      }
    >
        {contextHolder}
      <Modal
        title="Add new member"
        open={openModal}
        onOk={addNewMember}
        onCancel={() => setOpenModal(false)}
        destroyOnClose
      >
        <Typography.Text>Please select a member: </Typography.Text>
        <Select
          style={{ width: "100%", margin: "30px 0" }}
          placeholder="Select a staff"
          onChange={(id) => setSelectedMemberId(id)}
        >
          {staffs.map((staff) => (
            <Select.Option key={staff._id} value={staff._id}>
              {staff.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>

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
                <Select.Option
                  key={staff._id}
                  value={staff._id}
                >
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
              onDeselect={removeMember}
              open={false}
              tagRender={staffTagRender}
            />
          </Col>
        </Row>

        <Space className="update-btn__area">
          <Button className="update-group__button" onClick={updateGroup}>Update</Button>
        </Space>
      </Space>
    </Card>
  );
};

export default withAuthorization([user_permission.crud_user_group])(
  GroupDetail
);
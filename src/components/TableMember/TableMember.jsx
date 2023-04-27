import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Popconfirm,
  Radio,
  Space,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import "./TableMember.scss";
import axiosClient from "../../utils/clientAxios";

function TableMember({ users, onEdit, onDelete }) {
  const [form] = Form.useForm();

  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState();
  const [currentPermissions, setCurrentPermissions] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/permissions")
      .then((res) => {
        setPermissions(res.data.permissions);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get("/auth/getAllRole")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      key: "stt",
      className: "custom-index-column",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Username",
      align: "center",
      key: "username",
      dataIndex: "username",
      render: (text, record, rowIndex) => {
        return <Typography.Text>{record?.username}</Typography.Text>;
      },
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "email",
      key: "email",
      render: (text, record, rowIndex) => {
        return <Typography.Text>{record?.email}</Typography.Text>;
      },
    },
    {
      title: "Role",
      align: "center",
      dataIndex: "role",
      key: "role",
      render: (text, record, rowIndex) => {
        return <Typography.Text>{record?.role_id?.role_name}</Typography.Text>;
      },
    },
    {
      title: "Action",
      align: "center",
      key: "actions",
      dataIndex: "actions",
      width: "100px",
      render: (text, record) => {
        return (
          <>
            <Row className="request-detail__actions">
              <Col className="request-detail__icon">
                <Popconfirm
                  title="Bạn có chắc muốn xóa user này?"
                  onConfirm={() => onDelete(record._id)}
                  okText="Có"
                  cancelText="Không"
                >
                  <DeleteFilled />
                </Popconfirm>
              </Col>
              <Col
                className="request-detail__icon3"
                onClick={() => handleEdit(record)}
              >
                <EditFilled />
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  const addMember = (id) => {
    setCurrentPermissions([...currentPermissions, id]);
  };

  const removeMember = (perId) => {
    setCurrentPermissions(currentPermissions.filter((per) => per !== perId));
  };

  const handleEdit = (user) => {
    setCurrentPermissions(user.permission_id.map((per) => per._id));
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue(user);
  };

  const handleSave = (values) => {
    onEdit({ ...editingUser, ...values });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table dataSource={users} columns={columns} className="table-member" />

      {editingUser && (
        <Modal
          title="Edit user"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button key="save" type="primary" onClick={() => form.submit()}>
              Lưu
            </Button>,
          ]}
        >
          <Form
            form={form}
            onFinish={handleSave}
            initialValue={{ role: editingUser?.role_id?._id }}
          >
            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Choose role" }]}
            >
              <Radio.Group
                size="large"
                defaultChecked={"643d0d0c7ca86b1b36b6092c"}
                defaultValue={"643d0d0c7ca86b1b36b6092c"}
              >
                <Space direction="vertical">
                  {roles?.role?.map((role) => {
                    return (
                      <Radio key={role._id} value={role._id}>
                        {role.role_name.toUpperCase()}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Permission"
              // name="permission_id"
              rules={[{ required: true, message: "Choose permission" }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                value={currentPermissions}
                onDeselect={removeMember}
                onSelect={addMember}
              >
                {permissions?.map((per) => (
                  <Select.Option key={per._id} value={per._id}>
                    {per.permission_detail}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Enter username" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Enter email" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default TableMember;

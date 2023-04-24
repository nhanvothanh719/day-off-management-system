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
} from "antd";
import { useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

function TableMember({ users, onEdit, onDelete }) {
  const [form] = Form.useForm();

  const [editingUser, setEditingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
     {
      title: "ID",
      align: "center",
      key: "id",
      dataIndex: "id",
      render: (text, record, rowIndex) => {
        return <Typography.Text>{record?._id}</Typography.Text>;
      },
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
              <Col className="request-detail__icon3" onClick={() => handleEdit(record)} >
                <EditFilled />
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  const handleEdit = (user) => {
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
      <Table dataSource={users} columns={columns} />

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
        <Form form={form} onFinish={handleSave}>
          {/* <Form.Item
            label="Role"
            name="Role"
            rules={[{ required: true, message: "Choose role" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Permission"
            name="Permission"
            rules={[{ required: true, message: "Choose permission" }]}
          >
            <Input />
          </Form.Item> */}
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
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TableMember;

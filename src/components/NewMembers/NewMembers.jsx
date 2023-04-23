import React, { Fragment, useState, useEffect } from "react";
import "./NewMembers.scss";
import MyCard from "../Card/Card";
import axiosClient from "../../utils/clientAxios";
import { Button, Form, Input, Radio, Select, Space, message } from "antd";

const Member = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [permissions, setPermissions] = useState({});
  const [roles, setRoles] = useState({});

  const onFinish = (values) => {
    const { username, email, role, password, permission } = values;
    const new_user = {
      role_id: role,
      permission_id: permission,
      username: username,
      email: email,
      password: password,
    };
    storeUser(new_user);
  };

  const storeUser = (new_user) => {
    axiosClient
      .post("/users", new_user)
      .then(() => {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Create new User successfully",
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axiosClient
      .get("/permissions")
      .then((res) => {
        setPermissions(res.data);
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

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }

  const LogOffForm = (
    <Form
      form={form}
      onFinish={onFinish}
      className="custom-form"
      layout="vertical"
    >
      <Form.Item name="role" label="Role of user" rules={[{ required: true }]}>
        <Radio.Group size="large">
          <Space direction="vertical">
            {roles?.role?.map((role) => (
              <Radio value={role._id} onChange={handleChange}>
                {role.role_name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="permission"
        label="Permission"
        rules={[{ required: true }]}
      >
        <Select mode="multiple" style={{ width: "100%" }}>
          {permissions?.permissions?.map((permission) => (
            <Select.Option value={permission._id} onChange={handleChange}>
              {permission.permission_detail}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="username"
        label="Username"
        onChange={handleChange}
        rules={[{ required: true }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );

  return (
    <Fragment>
      {contextHolder}
      <MyCard title="New User" content={LogOffForm}></MyCard>
    </Fragment>
  );
};

export default Member;

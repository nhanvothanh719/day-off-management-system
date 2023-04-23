import React, { Fragment, useState } from "react";
import "./NewMembers.scss";
import MyCard from "../Card/Card";
import axiosClient from "../../utils/clientAxios";
import { Button, Form, Input, Radio, Select, Space, message } from "antd";

const Member = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    const { username, email, role, password, permission } = values;
    const new_user = {
      role: role,
      permission: permission,
      username: username,
      email: email,
      password: password,
    };
    storeUser(new_user);
  };

  const storeUser = (new_user) => {
    axiosClient
      .post("/", new_user)
      .then(() => {
        form.resetFields();
        messageApi.open({
          type: "success",
          content: "Create new User successfully",
        });
      })
      .catch((error) => console.log(error));
  };

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
            <Radio value="admin">Admin</Radio>
            <Radio value="manager">Manager</Radio>
            <Radio value="staff">Staff</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="permimssion"
        label="Permission"
        rules={[{ required: true }]}
      >
        <Select mode="multiple" style={{ width: "100%" }}>
          <Select.Option value="dashboard">Dashboard</Select.Option>
          <Select.Option value="request">Request</Select.Option>
          <Select.Option value="day_off">Day off</Select.Option>
          <Select.Option value="member">Member</Select.Option>
          <Select.Option value="group">Group</Select.Option>
          <Select.Option value="notification">Notification</Select.Option>
          <Select.Option value="sync">Sync</Select.Option>
          <Select.Option value="workspace">Workspace</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
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

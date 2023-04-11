import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import "./LoginForm.scss";
import {
  ImportOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

function LoginForm() {
  const [form] = Form.useForm();

  const img_src = "https://devplus.edu.vn/assets/images/devplus/Artboard_2.png";

  const formItemLayout = {
    labelCol: { span: 7 },
  };

  const onFinish = (values) => {};

  const onFinishFailed = (values) => {};

  return (
    <Row className="login__area">
      <Col className="login__container" xl={24} lg={24} md={24} sm={24} xs={24}>
        <Row className="login__content">
          <Col
            className="section--left"
            xl={15}
            lg={14}
            md={24}
            sm={24}
            xs={24}
          >
            <Row className="section--left__title">
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <img
                  className="logo--center"
                  src={img_src}
                  alt="devplus_logo"
                />
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography.Title className="title--big">
                  Welcome back
                </Typography.Title>
                <Typography.Title level={4} className="title--small">
                  Sign in to your account
                </Typography.Title>
              </Col>
            </Row>
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form
                  form={form}
                  name="basic"
                  className="login__form"
                  {...formItemLayout}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Input your username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    value="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Input your password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      icon={<ImportOutlined />}
                      className="login__button"
                    >
                      Sign in
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col className="section--right" xl={9} lg={10} md={24} sm={24} xs={24}>
            <Row>
              <Col
                className="section--right__title"
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                <Typography.Text className="title--big">
                  Other methods
                </Typography.Text>
                <Typography.Text className="title--small">
                  --Sign in with --
                </Typography.Text>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24} className="button__wrapper">
                <Button
                  className="login-with__button"
                  shape="round"
                  size="large"
                  icon={<GoogleOutlined />}
                >
                  Google
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default LoginForm;

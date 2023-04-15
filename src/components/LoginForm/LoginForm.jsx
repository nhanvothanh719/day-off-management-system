import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import "./LoginForm.scss";
import { ImportOutlined, GoogleOutlined } from "@ant-design/icons";
import { auth, provider } from "../../config/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import logo from "../../assets/images/logo.png";
import logo_text from "../../assets/images/logo_text2.png";

function LoginForm() {
  const [form] = Form.useForm();

  const img_src = "https://devplus.edu.vn/assets/images/devplus/Artboard_2.png";

  const formItemLayout = {
    labelCol: { span: 7 },
  };

  const onFinish = (values) => {};

  const onFinishFailed = (values) => {};

  const handleLoginGg = () => {
    signInWithPopup(auth, provider).then((userCredential) => {
      console.log(userCredential.user)
      localStorage.setItem("user_email", userCredential.user.email);
      localStorage.setItem("user_avatar", userCredential.user.photoURL);
      localStorage.setItem("user_name", userCredential.user.displayName);
    });
  };

  return (
    <Row className="login__area">
      <div className="side__image"></div>
      <Col className="login__container" xl={24} lg={24} md={24} sm={24} xs={24}>
        <span class="top"></span>
        <span class="right"></span>
        <span class="bottom"></span>
        <span class="left"></span>
        <Row className="login__content">
          <Col
            className="section--left"
            xl={15}
            lg={24}
            md={24}
            sm={24}
            xs={24}
          >
            <Row className="section--left__title">
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <img
                  className="logo--center"
                  src={logo_text}
                  alt="devplus_logo"
                />
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Typography.Title className="title--small">
                Sign in by entering information below
                </Typography.Title>        
              </Col>
            </Row>
            <Row>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form
                  form={form}
                  layout="vertical"
                  name="basic"
                  className="login__form"
                  {...formItemLayout}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="username"
                    label="Username"
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
                    label="Password"
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
          <Col
            className="section--right"
            xl={9}
            lg={24}
            md={24}
            sm={24}
            xs={24}
          >
            <Row>
              <Col
                className="section--right__title"
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
              >
                <img src={logo} alt="logo" class="logo__img" />
                <Typography.Text className="title--big">
                  Other methods
                </Typography.Text>
                <Typography.Text className="title--small">
                  --Sign in with --
                </Typography.Text>
              </Col>
              <Col
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="button__wrapper"
              >
                <Button
                  className="login-with__button"
                  shape="round"
                  size="large"
                  icon={<GoogleOutlined />}
                  onClick={handleLoginGg}
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

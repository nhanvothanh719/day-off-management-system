import { GoogleOutlined, ImportOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin, Typography, message } from "antd";
import { signInWithPopup } from "firebase/auth";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import logo_text from "../../assets/images/logo_text2.png";
import { auth, provider } from "../../config/FirebaseConfig";
import "./LoginForm.scss";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(false);

  const formItemLayout = {
    labelCol: { span: 7 },
  };

  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const onFinish = (values) => {
    setIsLoading(true);
    axios
      .post("http://localhost:8000/api/auth/login", values)
      .then((res) => {
        setIsLoading(false);
        if(res.data.success) {
          messageApi.open({
            type: 'success',
            content: res.data.message,
          });
          navigate("/account/dashboard");
        }
      })
      .catch((error) => {
        setIsLoading(false);
          messageApi.open({
            type: 'error',
            content: 'Incorrect user or password',
          });
      })
  };

  const handleLoginGg = () => {
    signInWithPopup(auth, provider).then((userCredential) => {
      localStorage.setItem("user_username", userCredential.user.username);
      localStorage.setItem("user_avatar", userCredential.user.photoURL);
      localStorage.setItem("user_name", userCredential.user.displayName);
      navigate("/account/dashboard");
    });
  };

  return (
    <Fragment>
      {contextHolder}
      <Row className="login__area">
        <div className="side__image"></div>
        <Col
          className="login__container"
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
        >
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
                        {
                          min: 8,
                          message: "Password must contain at least 8 characters!",
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
                          disabled={isLoading}
                        >
                          {isLoading === true ? <Spin indicator={loadingIcon} /> : 'Sign in'}
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
    </Fragment>
  );
}

export default LoginForm;

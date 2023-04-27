import {
  AntDesignOutlined,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  Popover,
  Row,
  Space,
  Typography,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import axiosClient from "../../utils/clientAxios";

import "./Profile.scss";
import MyCard from "../Card/Card";
import withAuthorization from "../../utils/withAuthorization";
import { user_permission } from "../../const/permission";
const Profile = () => {
  const userId = localStorage.getItem("userId");

  const [currentUser, setCurrentUser] = useState();
  const [isDisable, setIsDisable] = useState(true);
  const [nameChange, setNameChange] = useState();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = () => {
    setOpen(true);
  };
  const avatar_size = {
    xs: 80,
    sm: 140,
    md: 140,
    lg: 140,
    xl: 140,
    xxl: 140,
  };
  useEffect(() => {
    if (userId) {
      axiosClient.get(`/users/${userId}`).then((res) => {
        setCurrentUser(res.data);
      });
    }
  }, [userId]);
  const handleName = (name) => {
    setNameChange(name.target.value);
  };
  const changeName = () => {
    axiosClient
      .put(`/users/${userId}`, { username: nameChange })
      .then((res) => {
        setIsDisable(true);
        axiosClient.get(`/users/${userId}`).then((res) => {
          setCurrentUser(res.data);
        });
      });
  };

  const detailProfile = (
    <>
      {currentUser && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Text className="text-title">Display Name</Typography.Text>
          <Input
            addonAfter={
              isDisable ? (
                <EditOutlined onClick={() => setIsDisable(false)} />
              ) : (
                <Popover
                  getPopupContainer={(trigger) => trigger.parentElement}
                  content={
                    <>
                      <Space size={30} direction="horization">
                        <Button
                          onClick={changeName}
                          className="save-btn-profile"
                        >
                          Save
                        </Button>
                        <Button className="close-btn-profile" onClick={hide}>
                          Close
                        </Button>
                      </Space>
                    </>
                  }
                  title="Are you sure ?"
                  trigger="click"
                  visible={open}
                  onVisibleChange={handleOpenChange}
                >
                  <CheckOutlined
                    style={{
                      color: "green",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  />
                </Popover>
              )
            }
            defaultValue={currentUser ? currentUser.username : "User"}
            disabled={isDisable}
            onChange={handleName}
          />
          <Typography.Text className="text-title">Email</Typography.Text>
          <Input
            defaultValue={currentUser ? currentUser.email : "email"}
            disabled
            className="email-input"
          />
        </Space>
      )}
    </>
  );

  const profileAccount = (
    <>
      <Row gutter={[8, 8]} className="profile-container">
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={8}
          xxl={8}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {currentUser && currentUser.avatar ? (
            <Avatar
              size={{ xs: 80, sm: 120, md: 120, lg: 140, xl: 140, xxl: 140 }}
              src={currentUser.avatar}
            />
          ) : (
            <Avatar
              className="avatar"
              size={{ ...avatar_size }}
              icon={<AntDesignOutlined />}
            />
          )}
        </Col>
        <Col xs={24} sm={12} md={12} lg={16} xl={16} xxl={16}>
          <Space
            align="center"
            direction="vertical"
            size={[8, 0]}
            className="avatar-details"
          >
            {currentUser && (
              <Typography.Text className="avatar-name">
                {currentUser.username ? currentUser.username : "User"}
              </Typography.Text>
            )}
            <Typography.Text className="avatar-role">
              {currentUser ? currentUser.role_id.role_name : "Staff"}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
      <Row>
        <MyCard content={detailProfile}></MyCard>
      </Row>
    </>
  );
  return (
    <Fragment>
      <MyCard
        className="profile"
        title="Profile"
        content={profileAccount}
      ></MyCard>
    </Fragment>
  );
};

export default withAuthorization([user_permission.manage_self_details])(
  Profile
);


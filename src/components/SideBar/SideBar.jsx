/* eslint-disable react-hooks/exhaustive-deps */
import {
  ApartmentOutlined,
  DatabaseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Col, Space } from "antd";
import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import logo from "../../assets/images/logo.png";
import logoText from "../../assets/images/logo_text.png";

export const SideBar = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const rootSubmenuKeys = ["sub1", "sub2", "sub3"];
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    if (windowWidth <= 1376) {
      props.setCollapsed(true);
    } else {
      props.setCollapsed(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      width={400}
      collapsedWidth={100}
    >
      <Row className="slider-container">
        <Col md={24}>
          <Row className="logo-container">
            <Space size={0}>
              <img
                src={logo}
                alt="logo"
                className="logo"
                style={{ height: !props.collapsed ? "90px" : "auto" }}
              />
              {!props.collapsed && (
                <img src={logoText} alt="logoText" className="logo-text" />
              )}
            </Space>
          </Row>
          <Row>
            <Col md={24} className="menu-container">
              <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
              >
                <Menu.SubMenu
                  icon={<UserOutlined className="icon-menu-color" />}
                  key="sub1"
                  title="Account"
                >
                  <Menu.Item key="1">Dashboard</Menu.Item>
                  <Menu.Item key="2">Requests</Menu.Item>
                  <Menu.Item key="3">Days off</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  icon={<DatabaseOutlined className="icon-menu-color" />}
                  key="sub2"
                  title="Manager"
                >
                  <Menu.Item key="4">Members</Menu.Item>
                  <Menu.Item key="5">Groups</Menu.Item>
                  <Menu.Item key="6">Notifications</Menu.Item>
                  <Menu.Item key="7">Sync</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  icon={<ApartmentOutlined className="icon-menu-color" />}
                  key="sub3"
                  title="Aministrator"
                >
                  <Menu.Item key="8">Workspaces</Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Sider>
  );
};

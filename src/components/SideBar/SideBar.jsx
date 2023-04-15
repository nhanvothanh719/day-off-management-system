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
import logoText from "../../assets/images/logo_text2.png";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

export const SideBar = (props) => {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openKeys, setOpenKeys] = useState(["account"]);
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const rootSubmenuKeys = ["account", "manager", "administrator"];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    windowWidth <= 1376 ? props.setCollapsed(true) : props.setCollapsed(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleNavigate = (route) => {
    navigate(route);
    setSelectedKey(route.split("/").pop());
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      width={350}
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
                selectedKeys={[selectedKey]}
              >
                <Menu.SubMenu
                  icon={<UserOutlined className="icon-menu-color" />}
                  key="account"
                  title="Account"
                >
                  <Menu.Item
                    key="dashboard"
                    onClick={() => handleNavigate("/account/dashboard")}
                  >
                    Dashboard
                  </Menu.Item>
                  <Menu.Item
                    key="requests"
                    onClick={() => handleNavigate("/account/requests")}
                  >
                    Requests
                  </Menu.Item>
                  <Menu.Item
                    key="day-offs"
                    onClick={() => handleNavigate("/account/day-offs")}
                  >
                    Days off
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  icon={<DatabaseOutlined className="icon-menu-color" />}
                  key="manager"
                  title="Manager"
                >
                  <Menu.Item
                    key="members"
                    onClick={() => handleNavigate("/manager/members")}
                  >
                    Members
                  </Menu.Item>
                  <Menu.Item
                    key="groups"
                    onClick={() => handleNavigate("/manager/groups")}
                  >
                    Groups
                  </Menu.Item>
                  <Menu.Item
                    key="notifications"
                    onClick={() => handleNavigate("/manager/notifications")}
                  >
                    Notifications
                  </Menu.Item>
                  <Menu.Item
                    key="sync"
                    onClick={() => handleNavigate("/manager/sync")}
                  >
                    Sync
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                  icon={<ApartmentOutlined className="icon-menu-color" />}
                  key="administrator"
                  title="Administrator"
                >
                  <Menu.Item
                    key="workspaces"
                    onClick={() => handleNavigate("/administrator/workspaces")}
                  >
                    Workspaces
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Col>
          </Row>
        </Col>
      </Row>
    </Sider>
  );
};

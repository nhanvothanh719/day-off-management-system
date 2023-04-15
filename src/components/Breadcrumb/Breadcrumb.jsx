import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Row } from "antd";
import React from "react";
import "./Breadcrumb.scss";

const BreadcrumbComponent = (props) => (
  <Row className="breadcrumb__container">
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <UserOutlined />
        <span>Application List</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>
  </Row>
);

export default BreadcrumbComponent

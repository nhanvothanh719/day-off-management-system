import React, { useEffect, useState } from "react";
import "./DashboardContent.scss";
import { Col, Row } from "antd";
import DashboardCard from "../DashboardCard/DashboardCard";
import {
  UserOutlined,
  TeamOutlined,
  CommentOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import withAuthorization from "../../utils/withAuthorization";
import { user_permission } from "../../const/permission";
import { RequestSessionChart, RequestStatusChart, RequestAmountByMonth } from "../Charts";
import axiosClient from "../../utils/clientAxios";

const DashboardContent = () => {

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalGroups, setTotalGroups] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalWorkspaces, setTotalWorkspaces] = useState(0);

  useEffect(() => {
    async function getTotalRequests() {
      try {
        const response = await axiosClient.get('/requests');
        setTotalRequests(response.data.requests.length);
      } catch (error) {
        console.error(error);
      }
    }
    async function getTotalGroups() {
      try {
        const response = await axiosClient.get('/groups');
        setTotalGroups(response.data.groups.length);
      } catch (error) {
        console.error(error);
      }
    }
    async function getTotalUsers() {
      try {
        const response = await axiosClient.get('/users');
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error(error);
      }
    }
    async function getTotalWorkspaces() {
      try {
        const response = await axiosClient.get('/workspace');
        setTotalWorkspaces(response.data.workspace.length);
      } catch (error) {
        console.error(error);
      }
    }

    getTotalRequests();
    getTotalGroups();
    getTotalUsers();
    getTotalWorkspaces();

  }, []);

  return (
    <div className="custom-dashboard">
      <Row gutter={[30, 35]}>
        <DashboardCard
          number={totalUsers}
          description="Total Users"
          icon={<UserOutlined />}
        />
        <DashboardCard
          number={totalGroups}
          description="Total Groups"
          icon={<TeamOutlined />}
        />
        <DashboardCard
          number={totalRequests}
          description="Total Requests"
          icon={<ImportOutlined />}
        />
        <DashboardCard
          number={totalWorkspaces}
          description="Total Workspaces"
          icon={<CommentOutlined />}
        />
      </Row>

      <div className="charts-section">
        <Row gutter={[30, 0]}>
          <Col xl={10} lg={10} md={24} sm={24} xs={24}>
            <RequestStatusChart />
          </Col>
          <Col xl={14} lg={14} md={24} sm={24} xs={24}>
            <RequestSessionChart />
          </Col>
          <Col span={24}>
            <RequestAmountByMonth />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withAuthorization([user_permission.view_dashboard])(
  DashboardContent
);

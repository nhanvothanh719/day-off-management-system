import React from "react";
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
import { GroupRequestChart, RequestStatusChart } from "../Charts";
import RequestAmountByMonth from "../Charts/RequestAmountByMonth/RequestAmountByMonth";

const DashboardContent = () => {
  return (
    <div className="custom-dashboard">
      <Row gutter={[30, 35]}>
        <DashboardCard
          number="200"
          description="Members"
          icon={<UserOutlined />}
        />
        <DashboardCard
          number="20"
          description="Groups"
          icon={<TeamOutlined />}
        />
        <DashboardCard
          number="9900"
          description="Requests"
          icon={<ImportOutlined />}
        />
        <DashboardCard
          number="12"
          description="Workspace"
          icon={<CommentOutlined />}
        />
      </Row>

      <div className="charts-section">
        <Row gutter={[30, 0]}>
          <Col xl={10} lg={10} md={24} sm={24} xs={24}>
            <RequestStatusChart />
          </Col>
          <Col xl={14} lg={14} md={24} sm={24} xs={24}>
            <GroupRequestChart />
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

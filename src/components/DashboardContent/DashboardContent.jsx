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
import MyCard from "../Card/Card";
import { PieChart, Pie, Cell } from 'recharts';

const DashboardContent = () => {

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RequestStatusChart = () => {
    <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        </PieChart>
  }

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
        <Row gutter={30}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <MyCard title="Chart 1"></MyCard>
          </Col>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <MyCard title="Chart 2" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withAuthorization([user_permission.view_dashboard])(
  DashboardContent
);

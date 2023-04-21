import React from "react";
import "./Dashboard.scss";
import { Row } from "antd";
import DashboardCard from "../DashboardCard/DashboardCard";
import {
  DollarCircleOutlined,
  TeamOutlined,
  MessageOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import withAuthorization from "../../utils/withAuthorization";
import { user_permission } from "../../const/permission";

const Dashboard = () => {
  return (
    <div className="custom-dashboard">
      <Row gutter={[30, 20]}>
        <DashboardCard
          number="$2000"
          description="test desc1"
          icon={<DollarCircleOutlined />}
        />
        <DashboardCard
          number="1000"
          description="test desc2"
          icon={<TeamOutlined />}
        />
        <DashboardCard
          number="9900"
          description="test desc3"
          icon={<MessageOutlined />}
        />
        <DashboardCard
          number="Y1000"
          description="test desc4"
          icon={<LikeOutlined />}
        />
      </Row>
    </div>
  );
};

export default withAuthorization([user_permission.view_dashboard])(Dashboard);

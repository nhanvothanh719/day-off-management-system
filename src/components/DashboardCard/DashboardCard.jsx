import React from "react";
import "./DashboardCard.scss";
import { Col, Row, Space, Typography } from "antd";

function DashboardCard(props) {

  const {number, description, icon} = props;

  return (
      <Col
        xxl={6}
        xl={12}
        lg={12}
        md={12}
        sm={24}
        xs={24}
      >
        <div className="dashboard__card">
          <div className="card__wrapper">
            <Row>
            <Col className="card__content--left" span={18}>
              <Space direction="vertical" className="card__title">
                <Typography.Text className="card__title--big">{ number }</Typography.Text>
                <Typography.Text className="card__title--small">{ description }</Typography.Text>
              </Space>
            </Col>
            <Col className="card__content--right" span={6}>
              <div className="circle--white">
                { icon }
              </div>
            </Col>
            </Row>
          </div>
        </div>
      </Col>
  );
}

export default DashboardCard;

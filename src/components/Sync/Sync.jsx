import React from "react";
import { Row, Col, Space, Typography } from "antd";
import MyCard from "../Card/Card";
import not_completed from "../../assets/not_complete.svg";
const Sync = (props) => {
  const errorContent = (
    <Row>
      <Col span={24} className="error__container">
        <Space direction="vertical">
          <Typography.Text
            style={{ display: "flex", justifyContent: "center" }}
          >
            - This function is being constructed. -
          </Typography.Text>
          <img src={not_completed} alt="not_completed" />
        </Space>
      </Col>
    </Row>
  );

  return <MyCard title="Sync" content={errorContent}></MyCard>;
};

export default Sync;

import { Card, Col, Descriptions, Modal, Row, Space, Timeline, Typography } from 'antd'
import React from 'react'
import {
  ClockCircleOutlined,
  ClockCircleFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import TextArea from 'antd/lib/input/TextArea';
import "./DayOffDetail.scss"
import { useState } from 'react';


const DayOffDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Card
      title="DAY OFF DETAIL"
      bordered={false}
      className="card-container">
      <div
        style={{ height: "100%", backgroundColor: "#fff" }}
        className="dayoff-detail"
      >
        <Row gutter={[24, 24]} className="dayoff-detail-container">
          <Col Col xl={8} lg={8} md={8} sm={24} xs={24} className="col-thu1">
            <Descriptions
              style={{ width: "100%" }}
              title="BASIC INFORMATION"
              colon={false}
              column={1}
            >
              <Descriptions.Item label="From">14/04/2023</Descriptions.Item>
              <Descriptions.Item label="To">16/04/2023</Descriptions.Item>
              <Descriptions.Item label="Time">All day</Descriptions.Item>
              <Descriptions.Item label="Quantity">2</Descriptions.Item>
              <Descriptions.Item label="Reason">
                Personal Issue
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                Approved (1/2)
              </Descriptions.Item>
            </Descriptions>
            <Space direction="vertical">
              <Typography.Text>ACTIONS</Typography.Text>
              <ClockCircleFilled
                onClick={showModal}
                className="clock"


                style={{
                  color: " #e97a9a",
                  fontSize: "40px",
                  borderRadius: "20px",

                }}
              />
              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to revert the activity ?</p>
              </Modal>
            </Space>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24} className="col-thu1">
            <Space>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="dayoff-detail__history-text">Approved</Row>
                <Row>Hoang Pham Approved</Row>
              </Timeline.Item>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="dayoff-detail__history-text">
                  Request change
                </Row>
                <Row>Vinh Bui requested for change</Row>
              </Timeline.Item>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row>
                  <Col xl={10} lg={10} md={10} sm={10} xs={24}>
                    <Row className="request-detail__history-text">dayoff</Row>
                    <Row>Khoa Nguyen updated request</Row>
                    <Row>From: 14/04/2023</Row>
                    <Row>To: 16/04/2023</Row>
                    <Row>Time: All day</Row>
                    <Row>Quantity: 4</Row>
                    <Row>Reason: Personal Issue</Row>
                  </Col>
                  <Col
                    xl={2}
                    lg={2}
                    md={2}
                    sm={2}
                    xs={24}
                    style={{ fontSize: "30px", margin: "50px 20px 0 0", color: "#e97a9a" }}
                  >
                    <ArrowRightOutlined className="arrow-1" />
                  </Col>
                  <Col xl={10} lg={10} md={10} sm={10} xs={24}>
                    <Row className="request-detail__history-text">dayoff</Row>
                    <Row>Khoa Nguyen updated request</Row>
                    <Row>From: 14/04/2023</Row>
                    <Row>To: 16/04/2023</Row>
                    <Row>Time: All day</Row>
                    <Row>Quantity: 4</Row>
                    <Row>Reason: Personal Issue</Row>
                  </Col>
                </Row>
              </Timeline.Item>
            </Space>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default DayOffDetail
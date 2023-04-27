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
            
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default DayOffDetail
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Row,
  Col,
  Timeline,
  Modal,
  Input,
  Descriptions,
  Space,
  Typography,
  Card,
} from "antd";
import React, { useEffect, useState } from "react";
import "./RequestDetail.scss";
import {
  ClockCircleOutlined,
  EditFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import MyCard from "../Card/Card";
import axiosClient from "../../utils/clientAxios";

const RequestDetail = () => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [requestDetail, setRequestDetail] = useState([]);
  const { TextArea } = Input;
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setRequestDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!requestDetail) {
    return (
      <MyCard title="Request detail" loading={!requestDetail ? true : false} />
    );
  }
  const handleOk = () => {
    setIsModalEditOpen(false);
  };
  const handleCancel = () => {
    setIsModalEditOpen(false);
  };

  return (
    <Card title="REQUEST DETAIL" bordered={false} className="card-container">
      <div
        style={{ height: "100%", backgroundColor: "#fff" }}
        className="request-detail"
      >
        <Row gutter={[24, 24]} className="request-detail-container">
          <Col Col xl={8} lg={8} md={8} sm={24} xs={24} className="col-thu1">
            <Descriptions
              style={{ width: "100%" }}
              title="BASIC INFORMATION"
              colon={false}
              column={1}
            >
              <Descriptions.Item label="From">
                {requestDetail.start_date}
              </Descriptions.Item>
              <Descriptions.Item label="To">{requestDetail.end_date}</Descriptions.Item>
              <Descriptions.Item label="Time">{requestDetail.day_off_time}</Descriptions.Item>
              <Descriptions.Item label="Quantity">{requestDetail.quantity}</Descriptions.Item>
              <Descriptions.Item label="Reason">
                {requestDetail.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {requestDetail.status}
              </Descriptions.Item>
            </Descriptions>
            <Space direction="vertical">
              <Typography.Text>ACTIONS</Typography.Text>
              <EditFilled
                style={{
                  color: " #e97a9a",
                  fontSize: "40px",
                  borderRadius: "20px",
                }}
              />
            </Space>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24} className="col-thu1">
            <Space direction="vertical">
              <Typography.Text style={{fontSize:"16px", fontWeight:"bold"}}>HISTORIES</Typography.Text>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="request-detail__history-text">Request</Row>
                <Row>Khoa Nguyen requested</Row>
                <Row>From: 14/04/2023</Row>
                <Row>To: 16/04/2023</Row>
                <Row>Time: All day</Row>
                <Row>Quantity: 4</Row>
                <Row>Reason: Personal Issue</Row>
              </Timeline.Item>

              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="request-detail__history-text">Approved</Row>
                <Row>Hoang Pham Approved</Row>
              </Timeline.Item>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="request-detail__history-text">
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
                    <Row className="request-detail__history-text">Request</Row>
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
                    style={{
                      fontSize: "30px",
                      margin: "50px 20px 0 0",
                      color: "#e97a9a",
                    }}
                  >
                    <ArrowRightOutlined />
                  </Col>
                  <Col xl={10} lg={10} md={10} sm={10} xs={24}>
                    <Row className="request-detail__history-text">Request</Row>
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
        <Modal
          title="Reason for change"
          open={isModalEditOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <TextArea
            placeholder="Need more detail"
            style={{
              height: "200px",
              border: "1px solid #F4B0C2",
              borderRadius: "10px",
              boxShadow: "0px 0px 5px #e97a9a",
            }}
          ></TextArea>
        </Modal>
      </div>
    </Card>
  );
};

export default RequestDetail;

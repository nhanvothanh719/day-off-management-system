import { Row, Col, Timeline, Modal, Input } from "antd";
import React, { useState } from "react";
import "./RequestDetail.scss";
import {
  ClockCircleOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
  EditFilled,
} from "@ant-design/icons";

const RequestDetail = () => {
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { TextArea } = Input;
  const showModalApprove = () => {
    setIsModalApproveOpen(true);
  };
  const showModalReject = () => {
    setIsModalRejectOpen(true);
  };
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const handleOk = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
    setIsModalEditOpen(false);
  };
  const handleCancel = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
    setIsModalEditOpen(false);
  };
  return (
    <Row className="request-detail">
      <Row className="request-detail-container">
        <Col
          xl={8}
          lg={8}
          md={8}
          sm={8}
          xs={24}
          className="request-detail__basicInformation"
        >
          <Row className="request-detail__basicInformation-title">
            Basic Information
          </Row>
          <Row className="request-detail__basicInformation-text">
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              From
            </Col>
            <Col>2023-04-14</Col>
          </Row>
          <Row className="request-detail__basicInformation-text">
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              To
            </Col>
            <Col>2023-04-16</Col>
          </Row>
          <Row className="request-detail__basicInformation-text">
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              Time
            </Col>
            <Col>All day</Col>
          </Row>
          <Row className="request-detail__basicInformation-text">
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              Quantity
            </Col>
            <Col>2023-04-14</Col>
          </Row>
          <Row className="request-detail__basicInformation-text">
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              Reason
            </Col>
            <Col>2023-04-14</Col>
          </Row>
          <Row className="request-detail__basicInformation-text">
            <Col xl={6} lg={6} md={6} sm={6} xs={6}>
              Status
            </Col>
            <Col>2023-04-14</Col>
          </Row>
          <Row className="request-detail__basicInformation-title-under">
            Actions
          </Row>
          <Row className="request-detail__actions">
            <Col className="request-detail__icon" onClick={showModalApprove}>
              <CheckSquareFilled />
            </Col>
            <Col className="request-detail__icon2" onClick={showModalReject}>
              <CloseSquareFilled />
            </Col>
            <Col className="request-detail__icon3" onClick={showModalEdit}>
              <EditFilled />
            </Col>
            <Modal
              title="Approved"
              open={isModalApproveOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure approve this request?</p>
            </Modal>
            <Modal
              title="Rejected"
              open={isModalRejectOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure reject this request?</p>
            </Modal>
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
          </Row>
        </Col>
        <Col
          xl={16}
          lg={16}
          md={16}
          sm={16}
          xs={24}
          className="request-detail__history"
        >
          <Row className="request-detail__history-title">Histories</Row>
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
            <Row className="request-detail__history-text">Request change</Row>
            <Row>Vinh Bui requested for change</Row>
          </Timeline.Item>
        </Col>
      </Row>
    </Row>
  );
};

export default RequestDetail;

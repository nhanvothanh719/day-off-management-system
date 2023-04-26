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
  Form,
  Radio,
  DatePicker,
  InputNumber,
  message,
  Select,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import "./RequestDetail.scss";
import {
  ClockCircleOutlined,
  EditFilled,
  ArrowRightOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import MyCard from "../Card/Card";
import axiosClient from "../../utils/clientAxios";
import moment from "moment";

const RequestDetail = () => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [requestDetail, setRequestDetail] = useState([]);
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

  const [dayOffAmount, setDayOffAmount] = useState(0);
  const [dayOffSession, setDayOffSession] = useState("morning");

  const [messageApi, contextHolder] = message.useMessage();
  const dateFormat = "YYYY/MM/DD";
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const initialValues = {
    day_off_type: "off",
    session: "morning",
  };

  const onFinish = (values) => {
    const { day_off_range, day_off_type, reason, session } = values;
    const update_request = {
      reason: reason,
      start_date: moment(day_off_range[0]._d).format("L"),
      end_date: moment(day_off_range[1]._d).format("L"),
      quantity: dayOffAmount,
      day_off_type: day_off_type,
      day_off_time: session,
      status: "pending",
      approvers_number: 2, //HARD CODE
    };
    updateRequest(update_request);
    setIsModalEditOpen(false);
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setRequestDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const onDateRangeChange = (range) => {
    const day_off_amount = (range[1]._d - range[0]._d) / 3600 / 24 / 1000 + 1;
    dayOffSession === "all_day"
      ? setDayOffAmount(day_off_amount)
      : setDayOffAmount(day_off_amount / 2);
  };

  const onSessionChange = (option) => {
    const previous_session = dayOffSession;
    const day_off_amount = dayOffAmount;
    setDayOffSession(option);
    if (previous_session === "all_day" && option !== "all_day") {
      setDayOffAmount(day_off_amount / 2);
    } else if (previous_session !== "all_day" && option === "all_day") {
      setDayOffAmount(day_off_amount * 2);
    }
  };

  const updateRequest = (update_request) => {
    axiosClient
      .put(`/requests/${id}`, update_request)
      .then(() => {
        form.resetFields();
        setDayOffAmount(0);
        messageApi.open({
          type: "success",
          content: "Update request successfully",
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setRequestDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  if (!requestDetail) {
    return (
      <MyCard title="Request detail" loading={!requestDetail ? true : false} />
    );
  }
  const handleOk = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
  };
  const handleCancel = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
  };

  const showModalApprove = () => {
    setIsModalApproveOpen(true);
  };
  const showModalReject = () => {
    setIsModalRejectOpen(true);
  };
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };

  return (
    <Card title="REQUEST DETAIL" bordered={false} className="card-container">
      {contextHolder}
      <Modal
        title="Edit user"
        open={isModalEditOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          className="custom-form"
          layout="vertical"
        >
          <Form.Item
            name="day_off_type"
            label="Types of day off"
            rules={[{ required: true }]}
          >
            <Radio.Group size="large">
              <Space direction="vertical">
                <Radio value="off">Off</Radio>
                <Radio value="wfh">Work from home</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="day_off_range"
            label="From - To"
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker
              format={dateFormat}
              onChange={onDateRangeChange}
            />
          </Form.Item>

          <Form.Item label="Quantity">
            <InputNumber disabled value={dayOffAmount} />
          </Form.Item>

          <Form.Item
            name="session"
            label="Session"
            rules={[{ required: true }]}
          >
            <Select onChange={onSessionChange}>
              <Select.Option value="morning">Morning</Select.Option>
              <Select.Option value="afternoon">Afternoon</Select.Option>
              <Select.Option value="all_day">All day</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="reason" label="Reason" rules={[{ required: true }]}>
            <TextArea rows={4} showCount maxLength={100} />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
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
      <div
        style={{ height: "100%", backgroundColor: "#fff" }}
        className="request-detail"
      >
        <Row gutter={[24, 24]} className="request-detail-container">
          <Col Col xl={8} lg={8} md={8} sm={24} xs={24} className="col-thu1">
            <Descriptions
              title="BASIC INFORMATION"
              colon={false}
              column={1}
              className="description"
            >
              <Descriptions.Item label="From :">
                {requestDetail.start_date}
              </Descriptions.Item>
              <Descriptions.Item label="To :">
                {requestDetail.end_date}
              </Descriptions.Item>
              <Descriptions.Item label="Time :">
                {requestDetail.day_off_time}
              </Descriptions.Item>
              <Descriptions.Item label="Quantity :">
                {requestDetail.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Reason :">
                {requestDetail.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Status :">
                {requestDetail.status}
              </Descriptions.Item>
            </Descriptions>
            <Space direction="vertical">
              <Typography.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                ACTIONS
              </Typography.Text>
              <Row>
                <CheckSquareFilled
                  style={{
                    color: " #e97a9a",
                    fontSize: "40px",
                    borderRadius: "20px",
                    paddingRight: "10px",
                  }}
                  onClick={showModalApprove}
                />
                <CloseSquareFilled
                  style={{
                    color: " #e97a9a",
                    fontSize: "40px",
                    borderRadius: "20px",
                    paddingRight: "10px",
                  }}
                  onClick={showModalReject}
                />
                <EditFilled
                  style={{
                    color: " #e97a9a",
                    fontSize: "40px",
                    borderRadius: "20px",
                  }}
                  onClick={showModalEdit}
                />
              </Row>
            </Space>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24} className="col-thu1">
            <Space direction="vertical">
              <Typography.Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                HISTORIES
              </Typography.Text>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="request-detail__history-text">Request</Row>
                <Row>{requestDetail?.user_id?.username} requested</Row>
                <Row>From : {requestDetail.start_date}</Row>
                <Row>To : {requestDetail.end_date}</Row>
                <Row>Time : {requestDetail.day_off_time}</Row>
                <Row>Quantity : {requestDetail.quantity}</Row>
                <Row>Reason : {requestDetail.reason}</Row>
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
                    <ArrowRightOutlined className="arrow-1" />
                  </Col>
                  <Col xl={10} lg={10} md={10} sm={10} xs={24}>
                    <Row className="request-detail__history-text">
                      Request revert
                    </Row>
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
  );
};

export default RequestDetail;

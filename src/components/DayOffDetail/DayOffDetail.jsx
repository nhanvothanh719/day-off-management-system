import { Button, Card, Col, DatePicker, Descriptions, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Space, Timeline, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  ClockCircleOutlined,
  ClockCircleFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./DayOffDetail.scss"
import { useLocation } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";
import MyCard from '../Card/Card';
import moment from 'moment';


const DayOffDetail = () => {
  const [dayOffDetail, setDayOffDetail] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRevertOpen, setIsModalRevertOpen] = useState(false);

  const [dayOffAmount, setDayOffAmount] = useState(0);
  const [dayOffSession, setDayOffSession] = useState("morning");

  const [messageApi, contextHolder] = message.useMessage();
  
  const dateFormat = "YYYY/MM/DD";
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsModalRevertOpen(true)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalRevertOpen(false)
  };
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const initialValues = {
    day_off_type: "off",
    session: "morning",
  };

  const onFinish = (values) => {
    const { day_off_range, day_off_type, reason, session } = values;
    const revert_request = {
      reason: reason,
      start_date: moment(day_off_range[0]._d).format("L"),
      end_date: moment(day_off_range[1]._d).format("L"),
      quantity: dayOffAmount,
      day_off_type: day_off_type,
      day_off_time: session,
    };
    updateRequest(revert_request);
    setIsModalRevertOpen(false);
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setDayOffDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const updateRequest = (revert_request) => {
    axiosClient
      .put(`/dayOff/${id}`, revert_request)
      .then(() => {
        form.resetFields();
        setDayOffAmount(0);
        messageApi.open({
          type: "success",
          content: "Revert request successfully",
        });
      })
      .catch((error) => console.log(error));
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

  useEffect(() => {
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setDayOffDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  if (!dayOffDetail) {
    return (
      <MyCard title="Day Off detail" loading={!dayOffDetail ? true : false} />
    );
  }

  return (
    <Card
      title="DAY OFF DETAIL"
      bordered={false}
      className="card-container">
      <div
        style={{ height: "100%", backgroundColor: "#fff" }}
        className="dayoff-detail"
      >
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Are you sure you want to revert the request ?</p>
        </Modal>
        <Modal
        title="Revert request"
        open={isModalRevertOpen}
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
        <Row gutter={[24, 24]} className="dayoff-detail-container">
          <Col Col xl={8} lg={8} md={8} sm={24} xs={24} className="col-thu1">
            <Descriptions
              style={{ width: "100%" }}
              title="BASIC INFORMATION"
              colon={false}
              column={1}
            >
              <Descriptions.Item label="From">{dayOffDetail.start_date}</Descriptions.Item>
              <Descriptions.Item label="To">{dayOffDetail.end_date}</Descriptions.Item>
              <Descriptions.Item label="Time">{dayOffDetail.day_off_time}</Descriptions.Item>
              <Descriptions.Item label="Quantity">{dayOffDetail.quantiy}</Descriptions.Item>
              <Descriptions.Item label="Reason">
                {dayOffDetail.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {dayOffDetail.status}
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
            </Space>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24} className="col-thu1">
            <Space direction="vertical">
              <Typography.Text>HISTORIES</Typography.Text>
              <Timeline.Item
                dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                className="timeline-clock-icon"
              >
                <Row className="dayoff-detail__history-text">Day Off</Row>
                <Row>{dayOffDetail?.user_id?.username} requested</Row>
                <Row>From : {dayOffDetail.start_date}</Row>
                <Row>To : {dayOffDetail.end_date}</Row>
                <Row>Time: {dayOffDetail.day_off_time}</Row>
                <Row>Quantity: {dayOffDetail.quantity}</Row>
                <Row>Reason: {dayOffDetail.reason}</Row>
              </Timeline.Item>

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
import { Button, Card, Col, DatePicker, Descriptions, Form, Input, InputNumber, message, Modal, Radio, Row, Select, Space, Timeline, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  ClockCircleOutlined,
  ClockCircleFilled,
  DeleteFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./DayOffDetail.scss"
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()

  const dateFormat = "YYYY/MM/DD";
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const onDelete = () => {
    axiosClient.delete(`/dayOff/${id}`).then((res) => {
      navigate("/account/day-offs")
    })
  };

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

  useEffect(() => {
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setDayOffDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

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
    revertRequest(revert_request);
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
  const revertRequest = (revert_request) => {
    axiosClient
      .post(`/dayOff/${id}`, {...revert_request})
      .then(() => {
        form.resetFields();
        setDayOffAmount(0);
        messageApi.open({
          type: "success",
          content: "Revert request successfully",
        });
      navigate("/account/requests")

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
      {contextHolder}
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
              <Descriptions.Item label="Quantity">{dayOffDetail.quantity}</Descriptions.Item>
              <Descriptions.Item label="Reason">
                {dayOffDetail.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {dayOffDetail.status}
              </Descriptions.Item>
            </Descriptions>
            <Space direction="vertical">
              <Typography.Text style ={{fontSize: "16px", fontWeight: "bold"}}>ACTIONS</Typography.Text>
              <Row>
              <ClockCircleFilled
                onClick={showModal}
                className="clock"
                style={{
                  color: " #e97a9a",
                  fontSize: "40px",
                  borderRadius: "20px",
                }}
              />
              <DeleteFilled className="clock"
              onClick={onDelete}
                style={{
                  color: " #e97a9a",
                  fontSize: "40px",
                  marginLeft:"20px"
                }}
              />
              </Row>
            </Space>
          </Col>
          <Col xl={16} lg={16} md={16} sm={24} xs={24} className="col-thu1">
            <Space direction="vertical">
              <Typography.Text style ={{fontSize: "16px", fontWeight: "bold"}}>HISTORIES</Typography.Text>
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

            </Space>
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default DayOffDetail
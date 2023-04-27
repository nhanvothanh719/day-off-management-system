/* eslint-disable react-hooks/rules-of-hooks */
import {
  Row,
  Col,
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
  Timeline,
} from "antd";
import React, { useEffect, useState } from "react";
import "./RequestDetail.scss";
import {
  EditFilled,
  CheckSquareFilled,
  CloseSquareFilled,
  ClockCircleOutlined,
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
  const [requestHistories, setRequestHistories] = useState([]);

  const [isRefresh, setIsRefresh] = useState(false);

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

  const handleOk = () => {
    setIsModalEditOpen(false);
  }

  if (!requestDetail) {
    return (
      <MyCard title="Request detail" loading={!requestDetail ? true : false} />
    );
  }

  const displayRequestApprovers = (histories) => {
    let count = 0;
    histories?.map((history) => {
      if (history.action === "approve") {
        count++;
      }
    });
    return count;
  };

  const handleApprove = () => {
    setIsModalEditOpen(false);
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);

    axiosClient.put("/requests/approve", { request_id: id }).then((res) => {
      if (res.data.success) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setIsRefresh(true);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.message,
        });
      }
    });
  };

  const handleReject = () => {
    setIsModalEditOpen(false);
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);

    axiosClient.put("/requests/reject", { request_id: id }).then((res) => {
      if (res.data.success) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setIsRefresh(true);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.message,
        });
      }
    });
  };

  const handleCancel = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
    setIsModalEditOpen(false)
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

  useEffect(() => {
    axiosClient
      .get(`/requests/${id}`)
      .then((res) => {
        setRequestDetail(res.data.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
    axiosClient.get(`/histories/${id}`).then((res) => {
      setRequestHistories(res.data.request_histories);
    });

    if(isRefresh) {
      setIsRefresh(false)
    }
  }, [id, isRefresh]);

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
        onOk={handleApprove}
        onCancel={handleCancel}
      >
        <p>Are you sure approve this request?</p>
      </Modal>
      <Modal
        title="Rejected"
        open={isModalRejectOpen}
        onOk={handleReject}
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
                {requestDetail.day_off_time
                  ?.replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </Descriptions.Item>
              <Descriptions.Item label="Quantity :">
                {requestDetail.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Reason :">
                {requestDetail.reason}
              </Descriptions.Item>
              <Descriptions.Item label="Approvers :">
                {displayRequestApprovers(requestHistories) +
                  "/" +
                  parseInt(
                    requestDetail.approvers_number +
                      displayRequestApprovers(requestHistories)
                  )}
              </Descriptions.Item>
              <Descriptions.Item className={`request-status`} label="Status :">
                {requestDetail.status
                  ?.replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
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

              {requestHistories.map((history, id) => (
                <Timeline.Item
                  key={id}
                  dot={<ClockCircleOutlined style={{ color: "#e97a9a" }} />}
                  className="timeline-clock-icon"
                >
                  <Row className="request-detail__history-text">{history.action?.charAt(0).toUpperCase() + history.action?.slice(1)}</Row>
                  <div
                    dangerouslySetInnerHTML={{ __html: history.description }}
                  />
                </Timeline.Item>
              ))}
            </Space>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default RequestDetail;

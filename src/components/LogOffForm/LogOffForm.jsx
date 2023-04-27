import React, { Fragment, useState } from "react";
import "./LogOffForm.scss";
import {
  Button,
  Select,
  Form,
  DatePicker,
  Radio,
  InputNumber,
  Space,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import MyCard from "../Card/Card";
import axiosClient from "../../utils/clientAxios";
import moment from "moment";
import { sendTohrchannel } from "../../utils/slackAxios";
import axios from "axios";

dayjs.extend(customParseFormat);

function InputForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [dayOffAmount, setDayOffAmount] = useState(0);
  const [dayOffSession, setDayOffSession] = useState("morning");

  const dateFormat = "YYYY/MM/DD";

  const initialValues = {
    day_off_type: "off",
    session: "morning",
  };

  const onFinish = (values) => {
    const { day_off_range, day_off_type, reason, session } = values;
    const new_request = {
      reason: reason,
      start_date: moment(day_off_range[0]._d).format("L"),
      end_date: moment(day_off_range[1]._d).format("L"),
      quantity: dayOffAmount,
      day_off_type: day_off_type,
      day_off_time: session,
    };
    storeRequest(new_request);
    sendToSlack(new_request);
  };

  const storeRequest = (new_request) => {
    axiosClient
      .post("/requests", new_request)
      .then(() => {
        form.resetFields();
        setDayOffAmount(0);
        messageApi.open({
          type: "success",
          content: "Create new request successfully",
        });
      })
      .catch((error) => console.log(error));
  };

  const sendToSlack = (dataMes) => {
    const data = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "New request",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Type:*\n${dataMes.day_off_type}`,
            },
            {
              type: "mrkdwn",
              text: `*Created by:*\n ${localStorage.getItem("user_name")}`,
            },
          ],
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*When:*\n${dataMes.start_date} - ${dataMes.end_date}`,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Approve",
              },
              style: "primary",
              value: "click_me_123",
              url: "https://log-off-management.netlify.app/",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                emoji: true,
                text: "Reject",
              },
              style: "danger",
              value: "click_me_123",
            },
          ],
        },
      ],
    };
    axios.post(
      "https://hooks.slack.com/services/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",
      JSON.stringify(data),
      {
        withCredentials: false,
        transformRequest: [
          (data, headers) => {
            return data;
          },
        ],
      }
    );
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

  const LogOffForm = (
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

      <Form.Item name="session" label="Session" rules={[{ required: true }]}>
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
  );

  return (
    <Fragment>
      {contextHolder}
      <MyCard title="Log off" content={LogOffForm}></MyCard>
    </Fragment>
  );
}

export default InputForm;

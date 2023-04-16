import React, { useState } from "react";
import "./InputForm.scss";
import {
  Button,
  Select,
  Form,
  DatePicker,
  Radio,
  InputNumber,
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function InputForm() {
  const [form] = Form.useForm();

  const [dayOffAmount, setDayOffAmount] = useState(0);
  const [dayOffSession, setDayOffSession] = useState('morning');

  const dateFormat = "YYYY/MM/DD";

  const initialValues = {
    day_off_type: "off",
    session: "morning",
  };

  const onFinish = (values) => {
    form.resetFields();
  };

  const onDateRangeChange = (range) => {
    const day_off_amount = (range[1]._d - range[0]._d)/3600/24/1000 + 1;
    dayOffSession === "all_day" ? setDayOffAmount(day_off_amount) : setDayOffAmount(day_off_amount/2);
  }

  const onSessionChange = (option) => {
    const previous_session = dayOffSession;
    const day_off_amount = dayOffAmount;
    setDayOffSession(option);
    if(previous_session === "all_day" && option !== "all_day") {
      setDayOffAmount(day_off_amount/2);
    } else if(previous_session !== "all_day" && option === "all_day") {
      setDayOffAmount(day_off_amount*2);
    }
  }

  const onChange = (value) => {
  };

  return (
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
        <DatePicker.RangePicker format={dateFormat} onChange={onDateRangeChange} />
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

      <Form.Item
        label="Quantity"
      >
        <InputNumber disabled value={dayOffAmount} />
      </Form.Item>

      <Form.Item
        name="reason"
        label="Reason"
        rules={[{ required: true }]}
      >
        <TextArea rows={4} showCount maxLength={100} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
}

export default InputForm;

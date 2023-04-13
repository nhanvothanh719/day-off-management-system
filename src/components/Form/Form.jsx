import React from "react";
import "./Form.scss";
import { Button, Select, Form, DatePicker, Radio, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function InputForm() {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const initialValues = {
    day_off_type: "off",
    session: "morning",
  };

  const onFinish = (values) => {
    console.log(values);
    form.resetFields();
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      style={{ maxWidth: 600 }}
      className="custom-form"
    >
      <Form.Item
        name="day_off_type"
        label="Types of day off"
        rules={[{ required: true }]}
      >
        <Radio.Group size='large'>
          <Radio value="off">Off</Radio>
          <Radio value="wfh">Work from home</Radio>
        </Radio.Group>
      </Form.Item>
      
    <Form.Item
        name="day_off_length"
        label="From - To"
        rules={[{ required: true }]}
      >
        <DatePicker.RangePicker
      format={dateFormat}
    />
      </Form.Item>
      <Form.Item name="session" 
      label="Session" 
      rules={[{ required: true }]}>
        <Select onChange={onChange}>
          <Select.Option value="morning">Morning</Select.Option>
          <Select.Option value="afternoon">Afternoon</Select.Option>
          <Select.Option value="all_day">All day</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="day_off_quantity"
        label="Quantity"
        rules={[{ required: true }]}
      >
        <InputNumber min={1} max={7} defaultValue={0.5} onChange={onChange} />
      </Form.Item>
      <Form.Item name="reason" 
      label="Reason" 
      rules={[{ required: true }]}>
        <TextArea rows={4} showCount maxLength={100} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InputForm;

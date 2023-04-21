import React from 'react'
import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
const { Paragraph } = Typography;
const CustomizedForm = ({ onChange, fields }) => (
  <Form
    name="global_state"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields);
    }}
  >
    <Form.Item
      name="firstname"
      label="First Name"
      rules={[
        {
          required: true,
          message: 'firstname is required!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="lastname"
      label="Last Name"
      rules={[
        {
          required: true,
          message: 'Lastname is required!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[
        {
          required: true,
          message: 'Email is required!',
        },
      ]}
    >
      <Input />
    </Form.Item>
  </Form>
);
const EditMember = () => {
  const [fields, setFields] = useState([
    {
      name: ['email'],
      value: 'huutrungdoan2202@gmail.com',
    },
    {
      name:['firstname'],
      value: 'huu',
    },
    {
      name: ['lastname'],
      value: 'trung',
    }
  ]);
  
  return (
    <>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      <Paragraph
        style={{
          maxWidth: 440,
          marginTop: 24,
        }}
      >
        <pre
          style={{
            border: 'none',
          }}
        >
          {JSON.stringify(fields, null, 2)}
        </pre>
      </Paragraph>
      <Button type="primary" htmlType="Send"> send </Button>
    </>
  );
};
export default EditMember;
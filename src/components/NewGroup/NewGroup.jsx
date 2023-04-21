import React from 'react'
import { Space, Button, Card, Row, Col, Typography, Input, Select } from "antd";
import './NewGroup.scss';
import { useNavigate } from "react-router-dom";

const GroupDetail = (props) => {

  const navigate = useNavigate();
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <Card className='card-container-new-group' title='Basic Information' >
      <Space direction='vertical' size={20} style={{ width: '100%' }}>
        <Row gutter={[0, 12]}>
          <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
            <Typography.Text style={{ color: 'black', fontWeight: '500' }}>Name</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
            <Input />
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
            <Typography.Text style={{ color: 'black', fontWeight: '500' }}>Masters</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
            <Select
              mode="multiple"
              placeholder='Please Select'
              style={{ width: '100%' }}
              onChange={handleChange}
              options={options}
            />
          </Col>
        </Row>
        <Row gutter={[0, 12]}>
          <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
            <Typography.Text style={{ color: 'black', fontWeight: '500' }}>Members</Typography.Text>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
            <Select
              mode="multiple"
              placeholder='Please Select'
              style={{ width: '100%' }}
              onChange={handleChange}
              options={options}
            />
            <Button
              onClick={() => navigate("/manager/groups/new-group")}
            >
              Send
            </Button>
            <Button className='canel-btn'
              onClick={() => navigate("/manager/groups/new-group")}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Space>
    </Card>
  )
}
export default GroupDetail
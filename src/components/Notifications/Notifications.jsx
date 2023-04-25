import { Space, Button, Card, Row, Col, Typography, Input, Select,Form,Switch } from "antd";
import { useNavigate } from "react-router-dom";
import "./Notification.scss"
export default  Notification = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    
  };
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
    <Card className='card-container-group-detail'>
    <Space direction='vertical' size={20} style={{ width: '100%' }}>
       <div>
         <h3>Slack</h3>
       </div>
        <Row gutter={[0, 12]}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
                <Typography.Text style={{ color: 'black', fontWeight: '500' }}>Day off Channel</Typography.Text>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} >
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    
                    onChange={handleChange}
                    options={options}
                />
            </Col>
        </Row>
        <Row gutter={[0, 12]}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
                <Typography.Text style={{ color: 'black', fontWeight: '500' }}>HR Channel</Typography.Text>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    options={options}
                />
            </Col>
        </Row>
    </Space>
       <Form.Item
        label="Mapping user by email"
        className="switchButton"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
</Card>
  );
};
import React, { useState, useEffect } from 'react'
import { Space, Button, Card, Row, Col, Typography, Input, Select } from "antd";
import './GroupDetail.scss';
import { useNavigate, useLocation } from "react-router-dom";

const GroupDetail = (props) => {
    const [masters, setMasters] = useState([]);
    const [members, setMembers] = useState([]);
    const [name, setName] = useState('');

    const location = useLocation();
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
    useEffect(() => {
        if (location?.state.record) {
            setMasters(location.state.record.masters)
            setMembers(location.state.record.members)
            setName(location.state.record.name)
        }
    }, [location?.state])
    return (
        <Card className='card-container-group-detail' title='Basic Information' extra={<Button className='group-detail-btn'
            onClick={() => navigate("/manager/groups/new-group")}
        >
            + New Group
        </Button>}>
            <Space direction='vertical' size={20} style={{ width: '100%' }}>
                <Row gutter={[0, 12]}>
                    <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
                        <Typography.Text style={{ color: 'black', fontWeight: '500' }}>Name</Typography.Text>
                    </Col>
                    <Col xs={24} sm={24} md={9} lg={9} xl={9} xxl={9}>
                        <Input
                            disabled
                            defaultValue={location.state.record.name}
                        />
                    </Col>
                </Row>
                <Row gutter={[0, 12]}>
                    <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
                        <Typography.Text style={{ color: 'black', fontWeight: '500' }}>Masters</Typography.Text>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
                        <Select
                            mode="multiple"
                            disabled
                            style={{ width: '100%' }}
                            defaultValue={location.state.record.masters}
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
                            disabled
                            style={{ width: '100%' }}
                            defaultValue={location.state.record.members}
                            onChange={handleChange}
                            options={options}
                        />
                    </Col>
                </Row>
            </Space>
        </Card>
    )
}
export default GroupDetail
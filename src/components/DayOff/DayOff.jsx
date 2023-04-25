import { Button, Card, Col, Row, Table, Tag } from "antd";
import React, { useState } from "react";
import './DayOff.scss'
import { useNavigate } from "react-router-dom";


const DayOff = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false)
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const data = [];
  for (let i = 1; i < 50; i++) {
    data.push({
      key: i,
      dayOff: "14/04/2023-16/04/2023",
      quantity: 2,
      requester: `Lê Quang Túng ${i}`,
      tags: ["Approved"],
      requestTime: "Yesterday",
      Actions: "",
    });
  }
  const columns = [
    {
      
      title: "Request for date",
      align: "center",
      dataIndex: "dayOff",
      key: "dayOff",
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Requester",
      align: "center",
      dataIndex: "requester",
    },
    {
      title: "Status",
      align: "center",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "Pending") {
              color = "geekblue";
            } else if (tag === "Approved") {
              color = "green";
            } else if (tag === "Rejected") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: [
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.tags.includes(value),
      filterSearch: true,
    },
    {
      title: "Request date",
      align: "center",
      dataIndex: "requestTime",
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleRowClick = (record) =>{
    const rowKey = record.key
    navigate(`/account/day-offs/${rowKey}/dayOff-detail`)
  }
  return (
    <Card
      title={<div>ALL Dayoff</div>}
      bordered={false}
      className="card-container"
    >
      <div>
        <Row
          style={{
            marginBottom: 16,
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            onClick={start}
            loading={loading}
            style={{
              borderRadius: "8px",
              height: "40px",
              fontWeight: "500",
              fontSize: "16px ",
              backgroundColor: "#ea7a9a",
              border: "none",
            }}
            
          >
            Revert request
          </Button>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              className="dayoff-data-table"
              onRow={(record) => ({onClick:()=>handleRowClick(record),})}
            />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default DayOff;

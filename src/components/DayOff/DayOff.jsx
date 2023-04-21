import { Card, Col, Row, Table, Tag } from "antd";
import React, { useState } from "react";

const DayOff = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const data = [];
  for (let i = 0; i < 50; i++) {
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
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
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
  return (
    <Card
      title={<div>ALL REQUEST</div>}
      bordered={false}
      className="card-container"
    >
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              className="request-data-table"
              scroll={{ x: "max-content" }}
            />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default DayOff;

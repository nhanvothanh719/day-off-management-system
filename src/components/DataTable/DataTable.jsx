import { Button, Table, Tag } from "antd";
import React, { useState } from "react";
import './DataTable.scss'

const columns = [
  {
    title: "Request for date",
    dataIndex: "dayOff",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Requester",
    dataIndex: "requester",
  },
  {
    title: "Status",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color 
          if (tag === 'Pending') {
            color = 'geekblue';
          }else if(tag === 'Approved') {
            color = 'green'
          }else if(tag === 'Rejected') {
            color = "volcano"
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Request date",
    dataIndex: "requestTime",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const data = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    dayOff: "14/04/2023-16/04/2023",
    quantity: 2,
    requester: `Phùng Tất Đạt ${i}`,
    tags: ["Approved", "Rejected", "Pending"],
    requestTime: "Yesterday",
    Actions: "",
  });
}
function DataTable() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} title={() => "Request"}/>
    </div>
  );
}

export default DataTable;

import { Button, Table, Tag, Row, Modal, Col, Card, Input } from "antd";
import React, { useState } from "react";
import "./DataTable.scss";
import {
  CheckSquareFilled,
  CloseSquareFilled,
  EditFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/account/requests/request-detail");
  };

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      dayOff: "14/04/2023-16/04/2023",
      quantity: 2,
      requester: `Phùng Tất Đạt ${i}`,
      tags: ["Pending"],
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
    {
      title: "Action",
      align: "center",
      key: "actions",
      dataIndex: "actions",
      render: () => {
        return (
          <>
            <Row className="request-detail__actions">
              <Col className="request-detail__icon" onClick={showModalApprove}>
                <CheckSquareFilled />
              </Col>
              <Col className="request-detail__icon2" onClick={showModalReject}>
                <CloseSquareFilled />
              </Col>
              <Col className="request-detail__icon3" onClick={handleOnClick}>
                <EditFilled />
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((user) =>
    user.requester.toLowerCase().includes(searchText.toLowerCase())
  );
  const showModalApprove = () => {
    setIsModalApproveOpen(true);
  };
  const showModalReject = () => {
    setIsModalRejectOpen(true);
  };

  const handleOk = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
  };
  const handleCancel = () => {
    setIsModalApproveOpen(false);
    setIsModalRejectOpen(false);
  };
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
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
            Create request
          </Button>
        </Row>
        <Row
          style={{
            marginBottom: 16,
            justifyContent: "flex-end",
          }}
        >
          <Input.Search
            placeholder="Search requester"
            onChange={handleSearch}
            style={{ maxWidth: "300px",minWidth:"150px", }}
          />
        </Row>

        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredData}
              className="request-data-table"
              //scroll={{ x: "max-content" }}
            />
          </Col>
        </Row>
        <Modal
          title="Approved"
          open={isModalApproveOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure approve this request?</p>
        </Modal>
        <Modal
          title="Rejected"
          open={isModalRejectOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure reject this request?</p>
        </Modal>
    </Card>
  );
};

export default DataTable;

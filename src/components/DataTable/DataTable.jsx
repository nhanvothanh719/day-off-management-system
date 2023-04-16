import { Button, Table, Tag, Row, Modal, Col, Card, Space } from "antd";
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
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
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
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <Card title="ALL REQUEST" bordered={false} className="card-container">
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
            Create request
          </Button>
          <span
            style={{
              marginLeft: 8,
            }}
          >
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              className="request-data-table"
              scroll={{ x: 'max-content' }}
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
      </div>
    </Card>
  );
};

export default DataTable;

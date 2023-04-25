/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Table,
  Tag,
  Row,
  Modal,
  Col,
  Card,
  Input,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "./DataTable.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";

const DataTable = () => {
  const [loading, setLoading] = useState(false);
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [request, setRequest] = useState([]);

  const map = request.map((request) => request._id);

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/requests")
      .then((res) => {
        setRequest(res.data?.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    const data = request?.filter((item) => {
      return item?.user_id?.username.includes(searchText);
    });
    setRequest(data);
  }, [searchText]);

  const columns = [
    {
      title: "Request for date",
      align: "center",
      key: "start_date",
      dataIndex: "start_date",
      render: (text, record, rowIndex) => {
        return (
          <Typography.Text>
            {record?.start_date}-{record?.end_date}
          </Typography.Text>
        );
      },
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Requester",
      align: "center",
      dataIndex: "user_id",
      key: "user_id",
      render: (text, record, rowIndex) => {
        return <Typography.Text>{text ? text.username : ""}</Typography.Text>;
      },
    },
    {
      title: "Status",
      align: "center",
      key: "tags",
      dataIndex: "tags",
      render: () => {
        return <Tag className="ant-tag-geekblue">Pending</Tag>;
      },
    },
    {
      title: "Request date",
      align: "center",
      dataIndex: "day_off_time",
      key: "day_off_time",
      render: (text, record, rowIndex) => {
        return <Typography.Text>{record?.day_off_time}</Typography.Text>;
      },
    },
    // {
    //   title: "Action",
    //   align: "center",
    //   key: "actions",
    //   dataIndex: "actions",
    //   width: "100px",
    //   render: (id, record) => {
    //     return (
    //       <>
    //         <Row className="request-detail__actions">
    //           <Col className="request-detail__icon" onClick={showModalApprove}>
    //             <CheckSquareFilled />
    //           </Col>
    //           <Col className="request-detail__icon2" onClick={showModalReject}>
    //             <CloseSquareFilled />
    //           </Col>
    //           <Col
    //             className="request-detail__icon3"
    //           >
    //             <EditFilled />
    //           </Col>
    //         </Row>
    //       </>
    //     );
    //   },
    // },
  ];

  const handleRowClick = (record) => {
    const rowKey = record._id; // lấy rowKey của hàng được chọn
    navigate(`/account/requests/${rowKey}/request-detail`); // chuyển đến route với rowKey được truyền vào
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
      setLoading(false);
      navigate("/account/requests/new");
    }, 1000);
  };

  return (
    <Card
      title={<div>ALL REQUEST</div>}
      bordered={false}
      className="card-container"
    >
      <div>
        <>
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
              style={{ maxWidth: "300px", minWidth: "150px" }}
            />
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Table
                columns={columns}
                rowKey={map}
                dataSource={request}
                className="request-data-table"
                loading={!request ? true : false}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                })}
              />
            </Col>
          </Row>
        </>
      </div>
    </Card>
  );
};

export default DataTable;

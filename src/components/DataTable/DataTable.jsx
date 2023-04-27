/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Table,
  Tag,
  Row,
  Col,
  Card,
  Input,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "./DataTable.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";
import { useSelector } from "react-redux";
import { user_role } from "../../const/role";

const DataTable = () => {
  const userRole = useSelector((state) => state.auth.userRole);

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [request, setRequest] = useState([]);

  const map = request.map((request) => request._id);

  const navigate = useNavigate();

  useEffect(() => {
    const get_request_url = userRole === user_role.admin ? "/requests" : "/requests/get-all-requests-in-user-groups";
    axiosClient
      .get(get_request_url)
      .then((res) => {
        setRequest(res.data?.requests);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

    const data = request?.filter((item) => {
      return item?.user_id?.username.toLowerCase().includes(searchText.toLowerCase())
    });

  const columns = [
    {
      title: "Request for date",
      align: "center",
      key: "start_date",
      dataIndex: "start_date",
      render: (text, record, rowIndex) => {
        return (
          <Typography.Text>
            {record?.start_date} - {record?.end_date}
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
      render: (text, record) => {
        return <Tag className={`status-tag ${record.status}-status-tag`}>
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
          </Tag>;
      },
    },
    {
      title: "Request date",
      align: "center",
      dataIndex: "day_off_time",
      key: "day_off_time",
      render: (text, record, rowIndex) => {
        return <Typography.Text className={`status-tag ${record.day_off_time}-status-tag`}>
          {record?.day_off_time.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
        </Typography.Text>;
      },
    },
  ];

  const handleRowClick = (record) => {
    const rowKey = record._id; 
    navigate(`/account/requests/${rowKey}/request-detail`);
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
                dataSource={data}
                className="request-data-table"
                loading={!data ? true : false}
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

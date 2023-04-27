import { Button, Card, Col, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./DayOff.scss";
import { useNavigate } from "react-router-dom";

import axiosClient from "../../utils/clientAxios"

import { CSVLink } from 'react-csv';

const DayOff = () => {
  const navigate = useNavigate();
  const [dayOff, setDayOff] = useState();

  const gg_sheet_url = 'https://docs.google.com/spreadsheets/d/1vnax6diaaHR2t5vA1X93q_glrMz1GpjTj3RImN2eQhc/edit#gid=0';

  const goToGoogleSheet = () => {
    window.open(gg_sheet_url, '_blank');
  }

  const map = dayOff?.map((dayOff) => dayOff._id);
  
  useEffect(() => {
    axiosClient
      .get("/dayOff")
      .then((res) => {
        setDayOff(res.data?.request);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      key: "stt",
      className: "custom-index-column",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Request for date",
      align: "center",
      dataIndex: "dayOff",
      key: "dayOff",
      render: (text, record) => {
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
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Requester",
      align: "center",
      dataIndex: "requester",
      render: (text, record) => {
        return <Typography.Text>{record?.user_id?.username}</Typography.Text>;
      },
    },
    {
      title: "Status",
      align: "center",
      key: "status",
      dataIndex: "status",
      render: (text, record) => {
        return <Typography.Text className="day-off__status">{record?.status.charAt(0).toUpperCase() + record?.status.slice(1)}</Typography.Text>;
      },
      filters: [
        {
          text: "approved",
          value: "approved",
        },
        {
          text: "rejected",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record.status.includes(value),
      filterSearch: true,
    },
  ];

  const handleRowClick = (record) => {
    const rowKey = record._id;
    navigate(`/account/day-offs/${rowKey}/dayOff-detail`);
  };

  return (
    <Card
      title={<div>All Day off</div>}
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
          {
            dayOff &&
            <CSVLink data={dayOff} filename={"day-offs-file.csv"} target="_blank">
            <Button
            style={{
              borderRadius: "8px",
              height: "40px",
              fontWeight: "500",
              fontSize: "16px ",
              backgroundColor: "#fbe8ee",
              color: "#e97a9a",
              border: "none",
              margin: "0 40px 0 0"
            }}
          >
              Export CSV
            </Button>
          </CSVLink>
          }
          <Button
            type="primary"
            onClick={goToGoogleSheet}
            style={{
              borderRadius: "8px",
              height: "40px",
              fontWeight: "500",
              fontSize: "16px ",
              backgroundColor: "#ea7a9a",
              border: "none",
            }}
          >
            Google Sheet
          </Button>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Table
              columns={columns}
              rowKey={map}
              dataSource={dayOff}
              className="dayoff-data-table"
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
            />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default DayOff;

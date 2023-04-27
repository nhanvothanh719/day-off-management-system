import { Button, Card, Col, Row, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import './DayOff.scss'
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import axiosClient from "../../utils/clientAxios"

=======
import { CSVLink } from 'react-csv';
>>>>>>> feat: dpm-update-to-google-sheet

const DayOff = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [dayOff, setDayOff] = useState()

  const map = dayOff?.map(dayOff => dayOff._id)

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    axiosClient
      .get("/dayOff")
      .then((res) => {
        console.log(res)
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
        return <Typography.Text>{record?.start_date}-{record?.end_date}</Typography.Text>
      }
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
        return <Typography.Text>{record?.user_id?.username}</Typography.Text>
      }
    },
    {
      title: "Status",
      align: "center",
      key: "status",
      dataIndex: "status",
      render: (text, record) => {
        return <Typography.Text>{record.status}</Typography.Text>
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
    const rowKey = record._id
    navigate(`/account/day-offs/${rowKey}/dayOff-detail`)
  }

  const data1 = [
    { id: 1, name: 'John Doe', age: 25, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane.smith@example.com' },
    // add more data...
  ];
  
  const headers1 = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Email', key: 'email' },
  ];

  const exportCSVFile = () => {

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
<<<<<<< HEAD
=======
          <CSVLink data={data1} filename={"day-offs-file.csv"} target="_blank" headers={headers1}>
          <Button
            type="primary"
            //onClick={}
            style={{
              borderRadius: "8px",
              height: "40px",
              fontWeight: "500",
              fontSize: "16px ",
              backgroundColor: "#ea7a9a",
              border: "none",
            }}
            
          >
            Export CSV
          </Button>
          </CSVLink>
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
>>>>>>> feat: dpm-update-to-google-sheet
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

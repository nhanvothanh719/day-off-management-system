/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Row, Col, Card } from "antd";
import React, { useEffect, useState } from "react";
import "./Members.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";
import TableMember from "../TableMember/TableMember";

const UserTable = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [users]);

  const onDelete = async (id) => {
    await axiosClient.delete(`/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  const onEdit = async (updatedUser) => {
    await axiosClient.put(`/users/${updatedUser}`);
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setLoading(false);
      navigate("/manager/members/new-members");
    }, 1000);
  };
  return (
    <Card
      title={<div>ALL MEMBER</div>}
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
              New member
            </Button>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TableMember
                users={users}
                className="member"
                loading={!users ? true : false}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </Col>
          </Row>
        </>
      </div>
    </Card>
  );
};

export default UserTable;

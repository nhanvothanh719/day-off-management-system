/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Row, Col, Card } from "antd";
import React, { useEffect, useState } from "react";
import "./Members.scss";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/clientAxios";
import TableMember from "../TableMember/TableMember";
import { useSelector } from "react-redux";
import { user_role } from "../../const/role";

const UserTable = (values) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.userRole);

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    axiosClient.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  const onDelete = async (id) => {
    await axiosClient.delete(`/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
    axiosClient
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const onEdit = async (updatedUser) => {
    await axiosClient
      .put(`/users/${updatedUser._id}`, updatedUser)
      .then((res) => fetchUsers());
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
          {userRole === user_role.admin && (
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
          )}

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

import React from "react";
import "./CustomError.scss";
import { Row, Col, Space, Typography } from "antd";
import { useParams } from "react-router-dom";
import MyCard from "../Card/Card";

function CustomError(props) {
  const {error_code} = useParams();
  let error_name = "",
    error_message = "";

  switch (error_code) {
    case "404":
      error_name = "Page Not Found";
      error_message = "Oops... Page does not exist!";
      break;
    case "403":
      error_name = "Forbidden Error";
      error_message = "You do not have permission to view this resource!";
      break;
    case "400":
      error_name = "Bad Request";
      error_message = "Your request resulted in an error!";
      break;
    case "500":
      error_name = "Internal Server Error";
      error_message = "You do not have permission to view this resource!";
      break;
    default:
      break;
  }

  const errorContent = (
    <Row className="error__area">
    <Col span={24} className="error__container">
      <Space direction="vertical" className="error__wrapper">
        <Typography.Text className="error__code">- {error_code} -</Typography.Text>
        <Typography.Text className="error__name">{error_name}</Typography.Text>
        <Typography.Text className="error__message">{error_message}</Typography.Text>
      </Space>
    </Col>
  </Row>
  );

  return (
    <MyCard title={`Error ${error_code}`} content={errorContent}></MyCard>
  );
}

export default CustomError;

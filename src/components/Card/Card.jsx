import { Card } from "antd";
import "./Card.scss";

const MyCard = ({ title, content, actions }) => {
  return (
    <Card title={title} actions={actions} bordered={false} className="card-container">
      <p>{content}</p>
    </Card>
  );
};

export default MyCard;

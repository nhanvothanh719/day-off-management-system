
import { Card } from "antd";
import "./Card.scss";

const MyCard = ({ title, content, actions }) => {
  return (
    <Card
      title={title}
      actions={actions}
      bordered={false}
      className="card-container"
    >
      {content}
    </Card>
  );
};

export default MyCard;

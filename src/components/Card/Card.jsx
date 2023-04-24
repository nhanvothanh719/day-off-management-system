
import { Card } from "antd";
import "./Card.scss";

const MyCard = ({ title, content, actions,loading }) => {
  return (
    <Card
      title={title}
      actions={actions}
      bordered={false}
      className="card-container"
      loading={loading}
    >
      {content}
    </Card>
  );
};

export default MyCard;

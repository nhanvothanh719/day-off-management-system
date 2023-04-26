import { Card } from "antd";
import "./Card.scss";

const MyCard = ({ title, content, actions, loading, className, extra }) => {
  return (
    <Card
      title={title}
      actions={actions}
      bordered={false}
      className={`card-container ${className}`}
      loading={loading}
      extra={extra}
    >
      {content}
    </Card>
  );
};

export default MyCard;

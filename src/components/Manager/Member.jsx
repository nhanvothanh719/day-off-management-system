import { Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    email: "text1@gmail.com",
  },
  {
    key: "2",
    name: "Jim Green",
    email: "text2@gmail.com",
  },
  {
    key: "3",
    name: "Joe Black",
    email: "text3@gmail.com",
  },
];
const Member = () => <Table columns={columns} dataSource={data} bordered />;
export default Member;

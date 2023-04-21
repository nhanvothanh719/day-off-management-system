import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Button, Card } from "antd";
import './Groups.scss';
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const { Column } = Table;
const data = [
  {
    key: '1',
    name: 'HR',
    members: ['Huy Dinh', 'Tat Dat', 'Tan Vu', 'Huy Nguyen', 'Nhan', 'Tung', 'Trung '],
    masters: ['Quy Nguyen', 'Quoc']
  },
  {
    key: '2',
    name: 'KS',
    members: ['Tan Vu', 'Huy Nguyen'],
    masters: ['Dang', 'Nam']

  },
  {
    key: '3',
    name: 'DPM',
    members: ['Nhan', 'Tung Le'],
    masters: ['Thanh', 'Trang']
  },
];

const Groups = () => {
  // const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const handleOnClick = (key, id, record) => {
    switch (key) {
      case "detail":
        // navigate(/manager/groups / ${ id } / detail, { state: { record } });
        navigate(`/manager/groups/${id}/detail`,
          { state: { record } });
        break;
      case "new-group":
        navigate("/manager/groups/new-group");
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/groups')
  //     .then(response => {
  //       setGroups(response.data)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);
  // console.log(groups)

  return (
    <Card title={<div>ALL GROUPS</div>}
      bordered={false}
      className="groups-table"
    >
      <Button className='groups-table-button'
        onClick={() => handleOnClick("new-group")}
      >
        + New Group
      </Button>
      <Table dataSource={data} className='groups'>
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Member(s)"
          dataIndex="members"
          key="members"
          render={(members) => (
            <>
              {members.map((tag) => (
                <Tag key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Master(s)"
          dataIndex="masters"
          key="masters"
          render={(masters) => (
            <>
              {masters.map((masters) => (
                <Tag key={masters}>
                  {masters}
                </Tag>
              ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button className='groups-table-nextpagebtn'
                onClick={(key) => {
                  handleOnClick('detail', record.key, record)
                }}
              >
                Detail
              </Button>
              <Button className='groups-table-nextpagebtn'
                onClick={(key) => {
                  handleOnClick('detail', record.key, record)
                }}
              >
                Edit
              </Button>
            </Space>
          )}
        />
      </Table>
    </Card>
  )
}

export default Groups
import {
  Space,
  Row,
  Col,
  Typography,
  Select,
  Switch,
  message,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import "./Notification.scss";
import axiosClient from "../../utils/clientAxios";

import { publicChannel, privateChannel } from "../../utils/slackAxios";
import MyCard from "../Card/Card";

const Notification = () => {
  const [listChannelsPublic, setListChannelsPublic] = useState();
  const [listChannelsPrivate, setListChannelsPrivate] = useState();

  const [channels, setChannels] = useState([]);
  const [channelsPrivate, setChannelsPrivate] = useState([]);
  const [dataNotification, setNotification] = useState();

  const [isEmail, setIsEmail] = useState(false);
  const success = () => {
    message.success("Update channel send notification successfully");
  };

  const addChannel = (id) => {
    setChannels([...channels, id]);
  };

  const removeChannel = (channelId) => {
    setChannels(channels.filter((ch) => ch !== channelId));
  };

  const handleChange = (value) => {
    setIsEmail(value);
  };
  useEffect(() => {
    publicChannel().then((res) => {
      setListChannelsPublic(res.channels);
    });
    privateChannel().then((res) => {
      setListChannelsPrivate(res.channels);
    });
    axiosClient.get("/notification").then((res) => {
      setNotification(res.data.information[0]);
      setChannels(res.data.information[0].day_off_channel);
      setChannelsPrivate(res.data.information[0].hr_channel);
    });
  }, []);

  const handleUpdateNotification = () => {
    axiosClient
      .put(`/notification/${dataNotification._id}`, {
        day_off_channel: channels,
        hr_channel: channelsPrivate,
        by_email: isEmail,
      })
      .then((res) => {
        success();
      });
  };
  const notifi = (
    <>
      {dataNotification && (
        <Space direction="vertical" size={20} style={{ width: "100%" }}>
          <Row gutter={[0, 12]}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
              <Typography.Text style={{ color: "black", fontWeight: "500" }}>
                Day off Channel
              </Typography.Text>
            </Col>

            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                value={channels}
                onDeselect={removeChannel}
                onSelect={addChannel}
              >
                {listChannelsPublic &&
                  listChannelsPublic.map((channel) => (
                    <Select.Option key={channel.id} value={channel.id}>
                      {channel.name.toUpperCase()}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[0, 12]}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
              <Typography.Text style={{ color: "black", fontWeight: "500" }}>
                HR Channel
              </Typography.Text>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                value={channelsPrivate}
                onDeselect={removeChannel}
                onSelect={addChannel}
              >
                {listChannelsPrivate &&
                  listChannelsPrivate.map((channel) => (
                    <Select.Option key={channel.id} value={channel.id}>
                      {channel.name.toUpperCase()}
                    </Select.Option>
                  ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[0, 12]}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
              <Typography.Text style={{ color: "black", fontWeight: "500" }}>
                Mapping user by email
              </Typography.Text>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
              <Switch
                defaultChecked={
                  dataNotification && dataNotification?.by_email === false
                    ? false
                    : true
                }
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{
                borderRadius: "8px",
                height: "40px",
                fontWeight: "500",
                fontSize: "16px ",
                backgroundColor: "#ea7a9a",
                border: "none",
              }}
              onClick={() => handleUpdateNotification()}
            >
              Update
            </Button>
          </Row>
        </Space>
      )}
    </>
  );

  return (
    <MyCard
      title="Slack"
      className="card-container-group-detail"
      content={notifi}
    />
  );
};

export default Notification;

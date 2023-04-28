import axios from "axios";
import axiosClient from "./clientAxios";

export const publicChannel = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://slack.com/api/conversations.list",
      data: `token=${process.env.REACT_APP_TOKEN_BOT}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const privateChannel = async () => {
  try {
    const response = await axios({
      method: "post",
      url: "https://slack.com/api/conversations.list",
      data: `token=${process.env.REACT_APP_TOKEN_BOT}`,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendSlackChannelHr = (data) => {
    axiosClient
      .post(`/notification/sendHr`, data)
      .then((res) => {
        console.error(res.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

};

export const sendSlackChannelDayOff = (data) => {
  axiosClient
    .post(`/notification/sendDayoff`, data)
    .then((res) => {
      console.error(res.data.message);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });

};
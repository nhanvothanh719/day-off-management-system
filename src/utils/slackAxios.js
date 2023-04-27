import axios from "axios";
const tokenBot  = "xoxb-5169513343826-5169554102002-qqBN2lYRRZW5SMPQBpBaq9Mc"
const tokenAdmin = "xoxp-5169513343826-5169380876243-5170403007958-7f4d3e0ccc425d09792fbf1ac06c22de"
export const publicChannel = async () => {
        try {
          const response = await axios({
            method: 'post',
            url: "https://slack.com/api/conversations.list",
            data: `token=${tokenBot}`,
          })
          return response.data
        } catch (error) {
          console.error(error);
        }

  };
  export const privateChannel = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: "https://slack.com/api/conversations.list",
        data: `token=${tokenAdmin}`,
        params: {
            types: 'private_channel',
        }
      })
      return response.data
    } catch (error) {
      console.error(error);
    }

};
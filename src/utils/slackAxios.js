import axios from "axios";
const tokenBot  = "xoxb-5169513343826-5169554102002-L4aAdSO9kIt24zb9xlrOgzeX"
const tokenAdmin = "xoxp-5169513343826-5169380876243-5161345086055-74eb94805b4cf6e2f0f20617c58e1480"
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
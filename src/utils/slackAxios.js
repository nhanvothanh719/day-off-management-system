import axios from "axios";
const tokenBot  = "xoxb-5169513343826-5169554102002-JRdkA9oXrarPHP4epJDOslrj"
const tokenAdmin = "xoxp-5169513343826-5169380876243-5189669810737-c8ce1639f44347d035bafe967e3e1c70"
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

export const sendTohrchannel = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: "https://hooks.slack.com/services/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",
      data: {
        "blocks": [
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "New request",
              "emoji": true
            }
          },
          {
            "type": "section",
            "fields": [
              {
                "type": "mrkdwn",
                "text": "*Type:*\nPaid Time Off"
              },
              {
                "type": "mrkdwn",
                "text": "*Created by:*\n<example.com|Fred Enriquez>"
              }
            ]
          },
          {
            "type": "section",
            "fields": [
              {
                "type": "mrkdwn",
                "text": "*When:*\nAug 10 - Aug 13"
              }
            ]
          },
          {
            "type": "actions",
            "elements": [
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": "Approve"
                },
                "style": "primary",
                "value": "click_me_123"
              },
              {
                "type": "button",
                "text": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": "Reject"
                },
                "style": "danger",
                "value": "click_me_123"
              }
            ]
          }
        ]
      },
    })
    return response
  } catch (error) {
    console.error(error);
  }
};
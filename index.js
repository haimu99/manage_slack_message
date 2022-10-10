// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)

const { WebClient } = require("@slack/web-api");
require("dotenv").config();

const TOKEN = "xoxb-12028892434-3748661393668-ldAg0xFqUCbKqzVtK4Lq468b";
//slack app bot token

const client = new WebClient(TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  // logLevel: LogLevel.DEBUG
});

// Find conversation with a specified channel `name`
const findConversation = async (name) => {
  try {
    // Call the conversations.list method using the built-in WebClient
    const listPrivateChanel = await client.conversations.list({
      types: "private",
      limit: 1000,
    });
    for (const channel of listPrivateChanel.channels) {
      if (channel.name === name) {
        const conversationId = channel.id;
        return conversationId;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// list messages with a specified channelId
const listMessages = async (channelId) => {
  let conversationHistory;
  try {
    const result = await client.conversations.history({
      channel: channelId,
      cursor: "",
      limit: 1000,
    });
    conversationHistory = result;
    return conversationHistory.messages;
  } catch (error) {
    console.error(error);
  }
};

const publishMessage = async (id, text) => {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      // The token you used to initialize your app
      token: TOKEN,
      channel: id,
      text,
      // You could also use a blocks[] array to send richer content
    })

    // Print result, which includes information about the message (like TS)
  } catch (error) {
    console.error(error)
  }
}

const app = async () => {
  const conversationId = await findConversation("medical_alert_test"); // slack channel name
  const messages = await listMessages(conversationId);
  await publishMessage(conversationId, 'text send to message') // text send to slack
};

app();

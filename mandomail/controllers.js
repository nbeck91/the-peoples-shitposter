const { google } = require("googleapis");

require("dotenv").config({path: '../.env'});

const oAuth2Client = new google.auth.OAuth2(
  process.env.MAILCLIENT_ID,
  process.env.MAILCLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// set auth as a global default
google.options({
    auth: oAuth2Client
  });

const gmail = google.gmail({ auth: oAuth2Client, version: 'v1' });

async function listMessages() {
  try {
    const res = await gmail.users.messages.list({
      userId: 'me', // 'me' represents the authenticated user
      maxResults: 10, // Optional: Limit the number of results
      q: 'subject:reminder' // Optional: Filter messages by query
    });

    const messages = res.data.messages;
    if (messages && messages.length) {
      console.log('Messages:');
      messages.forEach((message) => {
        console.log(message.id);
      });
    } else {
      console.log('No messages found.');
    }
  } catch (err) {
    console.error('Error listing messages:', err);
  }
};

listMessages();
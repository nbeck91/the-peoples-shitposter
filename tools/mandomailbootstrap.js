const { google } = require('googleapis');
require('dotenv').config({path: '../.env'});
const express = require("express");
const { PORT, MAILCLIENT_ID, MAILCLIENT_SECRET, CALLBACK_URL } = process.env;
const app = express();

const CLIENT_ID = MAILCLIENT_ID;
const CLIENT_SECRET = MAILCLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
);

app.listen(PORT, () => {
    console.log("Authenticate with Google by opening http://localhost:" + PORT);
  });

function getGoogleAuthURL() {

    const scope = [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];
  
    return oauth2Client.generateAuthUrl({
      access_type: 'offline', 
      scope,
    });
  }
  
app.get('/', (req, res) => {
    res.redirect(getGoogleAuthURL());
});

app.get('/auth/google/callback',async (req,res)=>{
    const {code} = req.query;
    const {tokens} = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send(`Your refresh token is: ${tokens.refresh_token}<br><br>Save this in your .env file.`)
});
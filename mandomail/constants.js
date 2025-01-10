require("dotenv").config({path: '../'});

const auth = {
  type: "OAuth2",
  user: "nate.beck91@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: "Nate Beck <nate.beck91@gmail.com>",
  to: "nate.beck91@gmail.com@gmail.com",
  subject: "Gmail API NodeJS",
};

module.exports = {
  auth,
  mailoptions,
};
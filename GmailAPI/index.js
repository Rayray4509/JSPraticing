const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {config} = require('dotenv');
config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLEINT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 's107328021@mail1.ncnu.edu.tw',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: '哈囉我是node sever <s107328021@mail1.ncnu.edu.tw>',
      to: 'rayray4509@gmail.com',
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API  dflsjfljsdlfjslfjslfsjfs',
      html: `<h1>Hello!! Please click the link below to
       complete account verification. </h1><p>Click this link <a href="http://en.wikipedia.org/wiki/Lorem_ipsum" title="Lorem ipsum - Wikipedia, the free encyclopedia">Lorem ipsum</a> <p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));

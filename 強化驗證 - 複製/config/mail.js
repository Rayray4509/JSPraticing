import {config} from'dotenv';
config();
import nodemailer from 'nodemailer';
import { google } from 'googleapis';




const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLEINT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(id,mail) {
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
      to: `${mail}`,
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API  dflsjfljsdlfjslfjslfsjfs',
      html: `<h1>Hello!! Please click the link below to complete account verification.
            </h1><p>Click this link <a href='http://127.0.0.1:3000/mailVerification/${id}' >account verification</a> <p>`
      ,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } 
  catch (error) {
    return error;
  }
}


export default sendMail;

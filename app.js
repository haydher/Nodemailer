const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/", (req, res) => {
 const transporter = nodemailer.createTransport({
  host: process.env.SENDER_EMAIL_HOST,
  port: parseInt(process.env.SENDER_EMAIL_PORT),
  auth: {
   user: process.env.SENDER_EMAIL_ADDRESS,
   pass: process.env.SENDER_EMAIL_PASSWORD,
  },
 });

 const textMsg = `
 New Message!
 From:
 Full Name: ${req.body.fullName}
 Email: ${req.body.email}
 Message: ${req.body.message}
 `;

 const htmlMsg = `
 <h3>New Message!</h3>
 <h4>From:</h4>
 <p><b>Full Name:</b>    ${req.body.fullName}</p>
 <p><b>Email:</b>    ${req.body.email}</p>
 <br>
 <p><b>Message:</b><br><br> ${req.body.message}</p>
 `;

 const options = {
  from: `"${req.body.fullName}" <${req.body.email}`,
  to: process.env.TO_EMAIL_ADDRESS,
  subject: "Message from Portfolio",
  text: textMsg,
  html: htmlMsg,
 };

 transporter.sendMail(options, (err, info) => {
  if (err) {
   console.log("Error sending a message from the contact form.", err);
   return res.send({ status: 500, message: "Unable to send the message." });
  }
  console.log("sent mail", info.response);
  return res.send({ status: 200, message: "Message sent successfully." });
 });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

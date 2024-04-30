const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.mail.com", // Replace with the SMTP server for Mail.com
  port: 587, // Common port for SMTP. Use 465 for SSL.
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'cutthecable@techie.com ', // your email
    pass: "RFSK7ZV6UJQCKHPU5KCK" // your email password
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = { from: 'cutthecable@techie.com', to, subject, text };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Email sent: ' + info.response);
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

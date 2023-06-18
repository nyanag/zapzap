import express from "express";
import nodemailer from "nodemailer";
import csv from "csv-parser";
import multer from "multer";
import cors from "cors";
import * as fs from 'fs';

const app = express();


// API for file upload
// Handle success case
// Handle case when the csv is not formatted right

const upload = multer({ dest: 'uploads/' });

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
    methods: "GET, POST, PUT, DELETE" 
  }));

app.post('/api/upload', upload.single('file'), (req, res) => {

  const filePath = req.file.path;
  console.log(filePath)

  nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    // Message object
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        results.forEach((row) => {
            console.log(row)
          const { emailaddress, subject, body } = row;
          console.log(emailaddress, subject, body)
          const mailOptions = {
            from: "ananyasonline@gmail.com",
            to: emailaddress,
            subject: subject,
            text: body,
          };
  
          transporter.sendMail(mailOptions, (error,info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }
          });
        });


    });

      res.json({ message: 'File uploaded successfully' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default app;

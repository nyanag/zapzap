import express from "express";
import nodemailer from "nodemailer";
import csv from "csv-parser";
import multer from "multer";



const app = express();


// API for file upload
// Handle success case
// Handle case when the csv is not formatted right

const upload = multer({ dest: 'uploads/' });

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
          const { emailAddress, sender, recipient, subject, body } = row;
  
          const mailOptions = {
            from: sender,
            to: recipient,
            subject: subject,
            text: body,
          };
  
          transporter.sendMail(mailOptions, (error) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent successfully!');
            }
          });
        });

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

      res.sendStatus(200);
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default app;

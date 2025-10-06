require('dotenv').config();
const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let transporter = null;
let etherealTestAccount = null;

// Initialize mailer
async function initMailer() {
  if (process.env.USE_ETHEREAL === 'true') {
    etherealTestAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: etherealTestAccount.user,
        pass: etherealTestAccount.pass
      }
    });
    console.log('Using Ethereal (test) account.');
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
    console.log('Using real SMTP transport.');
  }

  await transporter.verify();
  console.log('Mailer ready.');
}

// Contact route
app.post('/contact',
  [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2 }),
    body('email').isEmail().withMessage('Valid email required'),
    body('subject').notEmpty().withMessage('Subject required'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 chars')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
      const info = await transporter.sendMail({
        from: `"${name}" <${process.env.MAIL_FROM || process.env.SMTP_USER || etherealTestAccount.user}>`,
        to: process.env.RECEIVER_EMAIL,
        subject: `[Portfolio Contact] ${subject}`,
        text: `From: ${name} (${email})\n\n${message}`,
        html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      res.json({ success: true, message: 'Message sent successfully!', previewUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to send message' });
    }
  }
);

initMailer().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});

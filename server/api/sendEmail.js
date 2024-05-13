import nodemailer from "nodemailer";
import { config } from 'dotenv';
config();

export default async function handler(req, res) {

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    res.setHeader('Access-Control-Allow-Origin', 'https://jon-portfolio-frontend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.status(200).end();
    return;
  }
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD
      },
    });

    const mailOptions = {
      from: `"Jon Portfolio page" <${process.env.USER_EMAIL}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `Jon Portfolio Page - New Message ${name}`,
      text: `You have received a new message from your website contact form.\n\nHere are the details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h4>You have received a new message from your website contact form.</h4><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://jon-portfolio-frontend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: 'Failed to send email', error: error.toString() });
  }
}
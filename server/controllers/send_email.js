import nodemailer from "nodemailer";

const USER_EMAIL = process.env.USER_EMAIL;
const USER_EMAIL_PASSWORD  = process.env.USER_EMAIL_PASSWORD;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

async function send_email({ name, email, message }) {

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: {USER_EMAIL},
        pass: {USER_EMAIL_PASSWORD},
      },
    });


    const mailOptions = {
      from: `"Jon Portfolio page" <${USER_EMAIL}>`,
      to: {RECEIVER_EMAIL},
      subject: `Jon Portfolio Page - New Message ${name}`,
      text: `You have received a new message from your website contact form.\n\nHere are the details:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h4>You have received a new message from your website contact form.</h4><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
    };


    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export default send_email;
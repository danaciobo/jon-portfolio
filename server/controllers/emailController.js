import send_email from "./send_email.js";

const create_email = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log({ name, email, message });
    await send_email({
name, email, message
    });
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

export default create_email;
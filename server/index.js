import express from 'express';
import cors from 'cors';
import {router} from './router.js';
import { config } from 'dotenv';
import send_email from './controllers/send_email.js';
config();


const PORT = process.env.PORT || 3005;
const app = express();


app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(router);


app.post('/send-email', async (req, res) => {
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
});


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
import express from 'express';
import cors from 'cors';
import router from './router.js';
import { config } from 'dotenv';

config();


const PORT = process.env.PORT || 3005;
const app = express();


app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})
import express from 'express';
import cors from 'cors';
import router from './router.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();


const PORT = process.env.PORT || 3005;
const MY_DB_URL = process.env.MY_DB_URL
const app = express();

mongoose.connect(MY_DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)})

// { "src": "/api/get-project-by-id", "dest": "api/getProjectById.js" },
// { "src": "/api/create-project", "dest": "api/createProject.js", "methods": ["POST"] },
// { "src": "/api/update-project", "dest": "api/updateProject.js", "methods": ["PUT"] },
// { "src": "/api/delete-project", "dest": "api/deleteProject.js", "methods": ["DELETE"] }
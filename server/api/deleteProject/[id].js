import Project from "../../models/project.js";
import mongoose from 'mongoose';
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

  try {
    // Connect to the database
    await mongoose.connect(process.env.MY_DB_URL);
    console.log('Connected to MongoDB');

    const id = req.query.id;
    console.log('Project ID:', id);

    const delectedProject = await Project.findOneAndDelete({ _id: id });
    // Close the database connection
    await mongoose.disconnect();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://jon-portfolio-frontend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Send the updated project as a JSON response
    res.status(200).json(delectedProject);
  }  catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update project', error: e.toString() });
  }
}

import Project from "../models/project.js";
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export default async function handler(req, res) {

  const { title, description, category, images, audio, preview_image } = req.body;
  if (!images || images.length === 0) {
    return res.status(400).json({ message: 'At least one image is required' });
  }

  try {
    // Connect to the database
    await mongoose.connect(process.env.MY_DB_URL);
    console.log('Connected to MongoDB');

    const newProject = await Project.create({
      title,
      description,
      category,
      images,
      audio,
      preview_image,
      date_added: Date.now(),
    });

    // Close the database connection
    await mongoose.disconnect();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'https://jon-portfolio-frontend.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Send the projects as a JSON response
 res.status(201).send(newProject);
  }  catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to create project', error: e.toString() });
  }
}

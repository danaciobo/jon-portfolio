
import Project from "../../models/project.js"; // Adjust the path based on your project structure
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MY_DB_URL);

    // Fetch projects from the database
    const projects = await Project.find();

    // Close the database connection
    await mongoose.disconnect();

    // Send the projects as a JSON response
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.toString() });
  }
}
import Project from "../models/project.js";
import cloudinary from "../middleware/cloudinary.js"


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Failed to fetch projects', error: e.toString() });
  }
};


export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to fetch project', error: e.toString() });

  }
};

export const createProject = async (req, res) => {

  const { title, description, category, images } = req.body;

  if (!images || images.length === 0) {
    return res.status(400).json({ message: 'At least one image is required' });
  }

  try {
    const uploadResponses = await Promise.all(
      images.map(image =>
        cloudinary.uploader.upload(image, { upload_preset: 'project_preset' })
      )
    );

    const imageUrls = uploadResponses.map(upload => upload.url);

    const newProject = await Project.create({
      title,
      description,
      category,
      images: imageUrls,
      date_added: Date.now(),
    });

    res.status(201).send(newProject);
  }

  catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to create project', error: e.toString() });
  }
}



export const updateProject = async (req, res) => {

  const { title, description, category, new_images } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const uploadResponses = await Promise.all(
      new_images.map(image =>
        cloudinary.uploader.upload(image, { upload_preset: 'project_preset' })
      )
    );
    const new_images_urls = uploadResponses.map(upload => upload.url);

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, category, images: new_images_urls},
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to update project', error: e.toString() });
  }
};

export const deleteProject = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const delectedProject = await Project.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: 'Delete successful' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to delete project', error: e.toString() });
  }
};
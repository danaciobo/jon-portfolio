import Project from "../models/project";
import cloudinary from "../middleware/cloudinary"


exports.getItems = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(200).json(projects);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};


exports.getItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    return res.status(200).json(project);

  } catch (e) {
    console.log(e);
    res.status(500);
  }
};

exports.createItem = async (req, res) => {

  const { title, description, category, image } = req.body;

  if (!image) {
    return res.status(400).send('Image is required');
  }

  if (image) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(image, { upload_preset: 'project', width: 500, height: 600 });

      if (uploadResponse) {
        const newProject = await Project.create({
          title,
          description,
          category,
          image: uploadResponse.url,
          date_added: Date.now(),
        });

        res.status(201).send(newProject);
      }

    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  };
}

exports.updateItem = async (req, res) => {

  const { title, description, category, image } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send('Project not found');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, category, image },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (e) {
    console.error(e);
    res.status(500).send('Failed to update project');
  }
};

exports.deleteItem = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const delectedProject = await Project.findOneAndDelete({ _id: req.params.id });
    res.status(200).json('Delete successful');
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
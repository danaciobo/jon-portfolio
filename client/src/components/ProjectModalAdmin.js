import React, { useState } from "react";
import { useProjects } from "../services/ProjectsContext";
import { uploadFilesToCloudinary } from "../services";

const ProjectModalAdmin = ({ project, onClose }) => {
  const { handleUpdateProject, handleDeleteProject } = useProjects();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    category: project.category,
    description: project.description,
    images: project.images,
    audio: project.audio,
    preview_image: project.preview_image
  });
  const [deletedImages, setDeletedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);

    if (isEditMode) {
      setDeletedImages([]);
      setNewImages([]);
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...formData.images];
    const deleted = updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
    setDeletedImages([...deletedImages, ...deleted]);
  };

  const handleNewImageChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreviewImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const urls = await uploadFilesToCloudinary(file);
      const imageUrl = urls[0];

      if (imageUrl) {
        setFormData({ ...formData, preview_image: imageUrl });

      } else {

        console.error("Failed to upload the preview image.");
        alert("Failed to upload the preview image.");
      }
    }
  };

  const handleSaveChanges = async () => {
    if (newImages.length > 0) {
      const urls = await uploadFilesToCloudinary(newImages);
      formData.images = [...formData.images, ...urls];
    }

    await handleUpdateProject(project._id, formData);
    setIsEditMode(false);
    onClose();
  };

  return (
    <div className="project-modal-admin">
      <button className="close-button" onClick={onClose}>x</button>
      {isEditMode ? (
        <>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <div className="project-image-modal-admin-edit-container">
          {formData.images.map((imgUrl, index) => (
            <div key={index}>
              <img src={imgUrl} alt={`Project ${formData.title}`} className="project-image-modal-admin-edit" />
              <button onClick={() => handleImageDelete(index)}>Delete</button>
            </div>
          ))}
          </div>
          {newImages.length > 0 && (
            <div>New Images to Upload:
              {newImages.map((file, index) => (
                <span key={index}>{file.name}</span>
              ))}
            </div>
          )}
          <div>
            <label htmlFor="project-images">Add Project Images:</label>
            <input type="file" multiple onChange={handleNewImageChange} />
          </div>
          <div><label htmlFor="audio-file">Change Audio File:</label>
            <input
              type="text"
              name="audio"
              value={formData.audio}
              onChange={handleChange}
              placeholder="SoundCloud Track URL"

            />
          </div>

          <div>
            <label htmlFor="preview-image">Change Preview Image:</label>
          <input type="file" onChange={handlePreviewImageChange} />
          </div>
          <button onClick={handleSaveChanges}>Save Changes</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={toggleEditMode}>Edit</button>
          <button onClick={() => { handleDeleteProject(project._id); onClose() }}>Delete</button>
          <div className="project-modal-admin-content">
            <h2>{project.title}</h2>
            <h3>{project.category}</h3>
            <p dangerouslySetInnerHTML={{ __html: project.description }} />
            <div>
            <label htmlFor="project-images">Project images:</label>
            <div className="project-images-admin">
              {project.images.map((image, index) => (
                <img key={index} src={image} alt={`${project.title} ${index + 1}`} className="project-image-modal-admin" />
              ))}
            </div>
            </div>
            <div>
            <label htmlFor="audio-file">Audio File:</label>
            <div dangerouslySetInnerHTML={{ __html: project.audio }}></div>
            </div>
            <div>
            <label htmlFor="preview-image">Preview Image:</label>
            </div>
            <img src={project.preview_image} alt="Preview" className="project-image-modal-admin" />

          </div>
        </>
      )}
    </div>
  );
};

export default ProjectModalAdmin;

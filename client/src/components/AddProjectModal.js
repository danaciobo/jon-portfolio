import React, {useState} from "react";

const AddProjectModal = ({isOpen, onClose, handleAddProject}) => {

  // State management for project data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [audio, setAudio] = useState("");
  const [preview_image, setPreview_image] = useState("");


  // function to handle multiple images
  const handleImages = (e) => {
    setFiles([...e.target.files]); }

// function to submit form
    const handleSubmit = (e) => {
      e.preventDefault();
      const projectData = {
        title,
        description,
        category,
        audio,

      }

// function to send new project to backend
      handleAddProject(projectData, files, preview_image);

// reset form fields
      setTitle("");
      setDescription("");
      setCategory("");
      setAudio("");
      setFiles([]);
      setPreview_image("")
      // close the modal
onClose();

    }

  // show nothing if the modal is not open
if (!isOpen) return null;

  return(
    <div className="add-project-modal">
      <div className="add-modal-content">
        <button className="close-button" onClick={onClose}>x</button>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} placeholder="Project title" required />
          <textarea value={description} onChange = {(e) => setDescription(e.target.value)} placeholder="Project description" required />

          <input type="text" value={category} onChange = {(e) => setCategory(e.target.value)} placeholder="Project category" required />
          <div>
            <label htmlFor="preview-image">Preview Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setPreview_image(e.target.files[0])} />
          </div>
          <div>
            <label htmlFor="project-images">Project Images:</label>
          <input type="file" multiple accept="image/*,audio/*" onChange={handleImages} />
          </div>
          <div>
          <label htmlFor="audio-file">Audio File:</label>
          <input type="text" value={audio} onChange={(e) => setAudio(e.target.value)} placeholder="Paste SoundCloud Embed code" />
          </div>
          <button type="submit">Add project</button>



        </form>


      </div>

    </div>
  )
}
export default AddProjectModal
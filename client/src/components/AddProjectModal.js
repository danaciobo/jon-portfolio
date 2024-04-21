import React, {useState} from "react";

const AddProjectModal = ({isOpen, onClose, handleAddProject}) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]);
  const [audio, setAudio] = useState("");
  const [preview_image, setPreview_image] = useState("");

  const handleImages = (e) => {
    setFiles([...e.target.files]); }


    const handleSubmit = (e) => {
      e.preventDefault();
      const projectData = {
        title,
        description,
        category,
        audio,

      }


      handleAddProject(projectData, files, preview_image);
      setTitle("");
      setDescription("");
      setCategory("");
      setAudio("");
      setFiles([]);
      setPreview_image("")
onClose();

    }

if (!isOpen) return null;

  return(
    <div className="add-project-modal">
      <div className="add-modal-content">
        <button className="close-button" onClick={onClose}>x</button>
        <form onSubmit={handleSubmit}>
          <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} placeholder="Project title" required />
          <textarea value={description} onChange = {(e) => setDescription(e.target.value)} placeholder="Project description" required />
          <input type="text" value={category} onChange = {(e) => setCategory(e.target.value)} placeholder="Project category" required />
          <input type="file" accept="image/*" onChange={(e) => setPreview_image(e.target.files[0])} />
          <input type="file" multiple accept="image/*,audio/*" onChange={handleImages} />
          <input type="text" value={audio} onChange={(e) => setAudio(e.target.value)} placeholder="SoundCloud Track URL" />
          <button type="submit">Add project</button>



        </form>


      </div>

    </div>
  )
}
export default AddProjectModal
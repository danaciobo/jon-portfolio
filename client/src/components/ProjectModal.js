import React from "react";
import { useRef } from "react";

const ProjectModal = ({ project, onClose }) => {

  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="project-modal" onClick={handleCloseModal}>
      <div className="modal-content" ref={modalRef}>
        <div className="close-btn" onClick={onClose}>x</div>

        <div className="modal-info">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-description">{project.description}</p>
          <p className="modal-description">{project.description}</p>
          <p className="modal-description">{project.description}</p>
        </div>
        <img src={project.image_path} alt={project.title} className="modal-img" />
        <img src={project.image_path} alt={project.title} className="modal-img" />
      </div>

    </div>

  )
}

export default ProjectModal;
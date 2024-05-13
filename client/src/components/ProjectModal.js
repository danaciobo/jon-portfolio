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
          <div>
          <p className="modal-title">{project.title}</p>
          <p className="modal-category">{project.category}</p>
          </div>
          <div className="modal-description" dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>
        <div className="modal-project-images">
          {project.images.map((image, index) => (
            <img key={index} src={image} alt={`${project.title} ${index + 1}`} className="modal-project-image" />
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: project.audio }}></div>
      </div>

    </div>

  )
}

export default ProjectModal;
import React from "react";


const ProjectCard = ({title, description, image_path, onClick}) => {

  return(
    <div className="project-container" onClick={onClick}>
      <img src={image_path} alt={title} className="project-img" />
      <div className="project-info">
        <h2 className="project-title">{title}</h2>
        <p className="project-description">{description}</p>
      </div>
    </div>
  )
}

export default ProjectCard;
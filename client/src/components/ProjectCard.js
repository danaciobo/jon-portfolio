import React from "react";


const ProjectCard = ({title, preview_image, onClick}) => {

  return(
    <div className="project-container" onClick={onClick}>

        <img src={preview_image} alt={title} className="project-image" />

      <div className="project-info">
        <p className="project-title">{title}</p>
        {/* <p className="project-description">{description}</p> */}
      </div>
    </div>
  )
}

export default ProjectCard;
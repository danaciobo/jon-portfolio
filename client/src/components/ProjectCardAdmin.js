
const ProjectCardAdmin = ({ project, onEdit }) => {




  return (
    <div className="project-card-admin" onClick={() => onEdit(project)}>

        <img src={project.preview_image} alt={project.title} className="project-image-thumbnail" />


      <div className="project-details">
        <h6>{project.title}</h6>
        {/* <p>{project.category}</p> */}

      </div>

    </div>
  );
};

export default ProjectCardAdmin;

import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectsGallery = ({ projects, selectedCategory, onProjectClick }) => {


  const filteredProjects = selectedCategory && selectedCategory !== "All"
    ? projects.filter(project => project.category === selectedCategory)
    : projects;
  console.log(projects)
  return (
    <div className="project-gallery">
      {filteredProjects.map(project => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          images={project.images}
          category={project.category}
          audio={project.audio}
          preview_image={project.preview_image}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  )
}

export default ProjectsGallery;
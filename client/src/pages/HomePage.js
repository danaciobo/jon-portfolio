import React from "react";
import { useState } from "react";
import ProjectsGallery from "../components/ProjectsGallery";
import projects from "../assets/projects";
import ProjectModal from "../components/ProjectModal";

const Home = () => {

  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };
  return (
    <div>
    <ProjectsGallery projects={projects} onProjectClick={handleProjectClick}/>
    {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </div>
  )
}

export default Home;
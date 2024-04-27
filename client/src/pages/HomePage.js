import React from "react";
import { useState } from "react";
import ProjectsGallery from "../components/ProjectsGallery";
// import projects from "../assets/projects";
import ProjectModal from "../components/ProjectModal";
import { useProjects } from "../services/ProjectsContext";
import { shuffleProjects } from "../services";


const Home = () => {

  const { projects, isLoading } = useProjects();

  const [selectedProject, setSelectedProject] = useState(null);

  const shuffledProjects = shuffleProjects(projects);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };
  return (

    <div>
    <ProjectsGallery projects={shuffledProjects} onProjectClick={handleProjectClick}/>
    {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </div>
  )
}

export default Home;
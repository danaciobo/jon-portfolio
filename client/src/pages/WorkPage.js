import React from "react";
import { useState } from "react";
import ProjectFilter from "../components/ProjectFilter";
import ProjectsGallery from "../components/ProjectsGallery";
import ProjectModal from "../components/ProjectModal";
// import projects from "../assets/projects";
import { useProjects } from "../services/ProjectsContext";

const categories = ["All", "Design", "Music", "Furniture"]

const Work = () => {

  const { projects, isLoading } = useProjects();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="work-container">
    <ProjectFilter categories={categories} onSelectCategory={handleCategoryClick} selectedCategory= {selectedCategory}/>
    <ProjectsGallery projects={projects} selectedCategory={selectedCategory} onProjectClick={handleProjectClick}/>
    {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} />}
    </div>
  )
}

export default Work;
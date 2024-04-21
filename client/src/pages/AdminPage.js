import React, { useState } from "react";
import { useProjects } from "../services/ProjectsContext";
import ProjectCardAdmin from "../components/ProjectCardAdmin";
import AddProjectModal from "../components/AddProjectModal";
import ProjectModalAdmin from "../components/ProjectModalAdmin";


const Admin = () => {
  const { projects, handleAddProject } = useProjects();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEditClick = (project) => {
    setSelectedProject(project)
  }

  const handleCloseEditModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="admin-container">
      <button className="add-project-btn" onClick={() => setIsAddModalOpen(true)}>Add New Project</button>
      <AddProjectModal
  isOpen={isAddModalOpen}
  onClose={() => setIsAddModalOpen(false)}
  handleAddProject={handleAddProject}
/>
      <div className="projects-list">
       {projects.map(project => (
          <ProjectCardAdmin key={project.id} project={project} onEdit={handleEditClick} />
        ))}
      </div>

      {selectedProject && <ProjectModalAdmin project={selectedProject} onClose={handleCloseEditModal}/>}

    </div>
  );
}

export default Admin;
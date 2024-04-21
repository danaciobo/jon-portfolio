import React, { createContext, useContext, useState, useEffect } from 'react';
import { uploadFilesToCloudinary } from '../services';
const { REACT_APP_BACKEND_HOST } = process.env;


const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${REACT_APP_BACKEND_HOST}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (projectData, images, preview_image) => {
    const imageUrls = await uploadFilesToCloudinary(images)
    const preview_imageUrl = await uploadFilesToCloudinary(preview_image)
    console.log(imageUrls)

    projectData.images = imageUrls;
    projectData.preview_image = preview_imageUrl[0];

    try {
      const response = await fetch(`${REACT_APP_BACKEND_HOST}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const project = await response.json();
      fetchProjects();
      console.log('Project added:', project);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleUpdateProject = async (id, updatedData) => {
    // const imageUrls = await uploadFilesToCloudinary(images);
    // updatedData.images = imageUrls;
    try {
      const response = await fetch(`${REACT_APP_BACKEND_HOST}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const project = await response.json();
      fetchProjects();
      console.log('Project updated:', project);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {

    try {
      const response = await fetch(`${REACT_APP_BACKEND_HOST}/projects/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchProjects();

    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };





return (
  <ProjectsContext.Provider value={{
    projects,
    isLoading,
    handleAddProject,
    handleUpdateProject,
    handleDeleteProject
  }}>
    {children}
  </ProjectsContext.Provider>
);
};
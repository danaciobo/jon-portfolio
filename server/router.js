import {Router} from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "./controllers/projectController.js"
import create_email from './controllers/emailController.js';

const router = Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById)
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject)

router.post('/send-email', create_email)

export default router;
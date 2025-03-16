import express from 'express'
import { addProject, getProjects, getSingleProject } from '../controllers/projectController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/auth.js';

const projectRouter = express.Router();

projectRouter.post('/new', upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 2}, {name: 'image3', maxCount: 3}, {name: 'image4', maxCount: 4}, {name: 'image5', maxCount: 5}]), authUser, addProject)
projectRouter.post('/list', authUser, getProjects)
projectRouter.post('/singleproject', authUser, getSingleProject)
export default projectRouter
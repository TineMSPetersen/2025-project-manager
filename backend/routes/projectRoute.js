import express from "express";
import {
  addProject,
  changeDueDate,
  changePriority,
  deleteProject,
  getArchiveProjects,
  getProjects,
  getSingleProject,
  markComplete,
} from "../controllers/projectController.js";
import upload from "../middleware/multer.js";
import authUser from "../middleware/auth.js";

const projectRouter = express.Router();

projectRouter.post(
  "/new",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 2 },
    { name: "image3", maxCount: 3 },
    { name: "image4", maxCount: 4 },
    { name: "image5", maxCount: 5 },
  ]),
  authUser,
  addProject
);
projectRouter.post("/list", authUser, getProjects);
projectRouter.post("/singleproject", authUser, getSingleProject);
projectRouter.post("/markcomplete", authUser, markComplete);
projectRouter.post("/changeduedate", authUser, changeDueDate);
projectRouter.post("/listarchive", authUser, getArchiveProjects);
projectRouter.post("/delete", authUser, deleteProject)
projectRouter.post("/changepriority", authUser, changePriority)

export default projectRouter;

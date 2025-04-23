import express from "express";
import authUser from "../middleware/auth.js";
import { addTeam } from "../controllers/teamController.js";
import upload from "../middleware/multer.js";

const teamRouter = express.Router();

teamRouter.post("/new", upload.fields([
  {name: "avatar", maxCount: 1}
]), authUser, addTeam)

export default teamRouter
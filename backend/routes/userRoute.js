import express from 'express'
import { CreateUser, LoginUser } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post("/createaccount", CreateUser)
userRouter.post("/loginuser", LoginUser)

export default userRouter;
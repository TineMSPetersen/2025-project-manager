import express from 'express'
import { AddCommissionType } from '../controllers/commissionControllerType.js'
import authUser from '../middleware/auth.js'

const commissiontypeRouter = express.Router()

commissiontypeRouter.post('/new', authUser, AddCommissionType)

export default commissiontypeRouter;
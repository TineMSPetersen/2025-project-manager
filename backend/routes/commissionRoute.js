import express from 'express'
import { AddCommissionType } from '../controllers/commissionController.js'
import authUser from '../middleware/auth.js'

const commissiontypeRouter = express.Router()

commissiontypeRouter.post('/newtype', authUser, AddCommissionType)

export default commissiontypeRouter;
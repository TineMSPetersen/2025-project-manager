import express from 'express'
import { AddCommissionFee, AddCommissionType, GetCommissionInfo } from '../controllers/commissionController.js'
import authUser from '../middleware/auth.js'

const commissionRouter = express.Router()

commissionRouter.post('/newtype', authUser, AddCommissionType)
commissionRouter.post('/get', authUser, GetCommissionInfo)
commissionRouter.post('/newfee', authUser, AddCommissionFee)

export default commissionRouter;
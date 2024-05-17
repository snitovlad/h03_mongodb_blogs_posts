import express from 'express';
import { deleteAllData } from '../controllers/testing/deleteAllData';

export const testingRouter = express.Router()

testingRouter.delete('/all-data', deleteAllData)

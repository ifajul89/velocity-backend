import express from 'express';
import { USER_ROLE } from './user.interface';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
const router = express.Router();
// 1. Get All Cars
router.get('/', auth(USER_ROLE.admin), userController.getUsers);
// 2. Get a Specific Car
router.get('/:id', auth(USER_ROLE.admin), userController.getSingleUsers);

export const userRoutes = router;

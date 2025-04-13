import express, { NextFunction, Request, Response } from 'express';
import { CarControllers } from './car.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';
import validateRequest from '../../middleware/validateRequest';
import { carValidationSchema } from './car.validation';
import { upload } from '../../utils/sendImageCloudinary';
const router = express.Router();
// 1. Create a Car
router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    // Add file path to body for validation
    if (req.file) {
      req.body.image = req.file.path;
    }
    next();
  },
  validateRequest(carValidationSchema),
  CarControllers.createCar,
);
// 2. Get All Cars
router.get('/', CarControllers.getCars);
// 3. Get a Specific Car
router.get('/:id', auth(USER_ROLE.admin), CarControllers.getSpecificCar);
// 4. Update a Car
router.patch('/:id', auth(USER_ROLE.admin), CarControllers.updateCar);
// 5. Delete a Car
router.delete('/:id', auth(USER_ROLE.admin), CarControllers.deleteCar);

export const CarRoutes = router;

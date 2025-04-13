import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';
// import validateRequest from '../../middleware/validateRequest';
// import orderValidation from './order.validation';

const router = express.Router();

// Verify payment
router.get('/verify', auth(USER_ROLE.admin), orderController.verifyPayment);

// Order routes
router.post('/', auth(USER_ROLE.admin), orderController.createOrder);
router.get('/', auth(USER_ROLE.admin), orderController.getOrders);

router.get('/details', auth(USER_ROLE.admin), orderController.getDetails);

// Get revenue
router.get('/revenue', auth(USER_ROLE.admin), orderController.getRevenue);

export const orderRoutes = router;

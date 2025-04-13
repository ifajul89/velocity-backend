import { Router } from 'express';
import { CarRoutes } from '../modules/car/car.route';
import { orderRoutes } from '../modules/order/order.route';
import authRoute from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const modelRouters = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
];

modelRouters.forEach((route) => router.use(route.path, route.route));

export default router;

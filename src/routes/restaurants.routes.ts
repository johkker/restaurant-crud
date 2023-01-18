import { Router } from 'express';
import {
  checkOpenStatusByIdController,
  getAllRestaurantsController,
  createRestaurantController,
  deleteRestaurantController,
  getRestaurantByIdController,
  getRestaurantsByTypeController,
  updateRestaurantController,
} from '../controllers';
import {
  checkOpenStatusSchema,
  createRestaurantSchema,
  updateRestaurantSchema,
} from '../schemas';
import { formValidator } from '../middlewares';

const restaurantRoutes = Router();

restaurantRoutes.get('/', getAllRestaurantsController);

restaurantRoutes.get(
  '/open/:id',
  formValidator(checkOpenStatusSchema),
  checkOpenStatusByIdController
);

restaurantRoutes.get('/:id', getRestaurantByIdController);

restaurantRoutes.get('/type/:id', getRestaurantsByTypeController);

restaurantRoutes.post(
  '/',
  formValidator(createRestaurantSchema),
  createRestaurantController
);

restaurantRoutes.patch(
  '/:id',
  formValidator(updateRestaurantSchema),
  updateRestaurantController
);

restaurantRoutes.delete('/:id', deleteRestaurantController);

export default restaurantRoutes;

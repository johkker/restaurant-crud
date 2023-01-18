import { Router } from 'express';
import restaurantRoutes from './restaurants.routes';
import typesRoutes from './types.routes';

const routes = Router();

routes.use('/restaurants', restaurantRoutes);
routes.use('/types', typesRoutes);

export default routes;

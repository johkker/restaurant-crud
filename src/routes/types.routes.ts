import { Router } from 'express';
import {
  createTypeController,
  deleteTypeController,
  getTypesController,
} from '../controllers';
import { formValidator } from '../middlewares';
import { typeSchema } from '../schemas';

const typesRoutes = Router();

typesRoutes.get('/', getTypesController);
typesRoutes.post('/', formValidator(typeSchema), createTypeController);
typesRoutes.delete('/:id', deleteTypeController);

export default typesRoutes;

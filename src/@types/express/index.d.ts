import * as express from 'express';
import { CreateRestaurantInput } from '../../interfaces';

declare global {
  namespace Express {
    interface Request {
      newInput: CreateRestaurantInput;
    }
  }
}

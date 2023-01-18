import { Request, Response } from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  deleteRestaurant,
  getRestaurantById,
  getRestaurantsByType,
  updateRestaurant,
  checkIsOpen,
} from '../services';

const createRestaurantController = async (req: Request, res: Response) => {
  const result = await createRestaurant(req.newInput);
  return res.status(201).json(result);
};

const getAllRestaurantsController = async (req: Request, res: Response) => {
  const result = await getAllRestaurants();
  return res.status(200).json(result);
};

const deleteRestaurantController = async (req: Request, res: Response) => {
  const result = await deleteRestaurant(req.params.id);
  return res.status(200).json(result);
};

const getRestaurantByIdController = async (req: Request, res: Response) => {
  const result = await getRestaurantById(req.params.id);
  return res.status(200).json(result);
};

const getRestaurantsByTypeController = async (req: Request, res: Response) => {
  const result = await getRestaurantsByType(req.params.id);
  return res.status(200).json(result);
};

const updateRestaurantController = async (req: Request, res: Response) => {
  const result = await updateRestaurant(req.params.id, req.newInput);
  return res.status(200).json(result);
};

const checkOpenStatusByIdController = async (req: Request, res: Response) => {
  const result = await checkIsOpen(req.params.id, req.newInput);
  return res.status(200).json(result);
};

export {
  createRestaurantController,
  getAllRestaurantsController,
  deleteRestaurantController,
  getRestaurantByIdController,
  getRestaurantsByTypeController,
  updateRestaurantController,
  checkOpenStatusByIdController,
};

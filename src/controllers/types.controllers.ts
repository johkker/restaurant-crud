import { Request, Response } from 'express';
import { createType, deleteType, getAllTypes } from '../services/types.service';

const getTypesController = async (req: Request, res: Response) => {
  const result = await getAllTypes();
  return res.status(200).json(result);
};

const createTypeController = async (req: Request, res: Response) => {
  const result = await createType(req.newInput);
  return res.status(201).json(result);
};

const deleteTypeController = async (req: Request, res: Response) => {
  const result = await deleteType(req.params.id);
  return res.status(200).json(result);
};

export { getTypesController, createTypeController, deleteTypeController };

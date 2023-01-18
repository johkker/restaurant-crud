import { NextFunction, Request, Response } from 'express';
import GlobalError from '../errors';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof GlobalError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  }
  console.log(err);
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;

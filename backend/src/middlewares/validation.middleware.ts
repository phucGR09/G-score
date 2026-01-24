import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import ApiError from '../utils/ApiError';

const sbdSchema = z.string().regex(/^\d{8}$/, 'Registration number must be 8 digits');

const groupSchema = z.enum(['A'], {
  errorMap: () => ({ message: 'Only group A is currently supported' })
});


export const validateSbd = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sbd } = req.params;
    sbdSchema.parse(sbd);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(new ApiError(400, error.errors[0].message));
    } else {
      next(error);
    }
  }
};

export const validateGroup = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { group } = req.query;
    if (group) {
      groupSchema.parse(group);
    }
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(new ApiError(400, error.errors[0].message));
    } else {
      next(error);
    }
  }
};

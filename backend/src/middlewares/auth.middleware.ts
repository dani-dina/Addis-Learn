import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import STATUS_CODES from '../constants/statusCode';
import ERROR_MESSAGES from '../constants/errorMessages';
import User from '../models/user.model';

interface JwtPayload {
  id: string;
  email: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  try {
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    req.user = { id: user._id.toString(), email: user.email };
    next();
  } catch (err) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED,
    });
  }
};
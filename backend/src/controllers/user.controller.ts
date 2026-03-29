import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import STATUS_CODES from '../constants/statusCode';
import ERROR_MESSAGES from '../constants/errorMessages';
import { generateToken } from '../utils/jwt';

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, roles } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(STATUS_CODES.CONFLICT).json({
        success: false,
        message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      roles,
    });

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        token: generateToken(user._id.toString()),
      },
    });
  } catch (err) {
    next(err);
  }
};


// Login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('roles');
    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        token: generateToken(user._id.toString()),
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get current logged-in user
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.id).populate('roles profile');
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        roles: user.roles,
        profile: user.profile,
      },
    });
  } catch (err) {
    next(err);
  }
};


// Update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, roles } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (roles) user.roles = roles;

    await user.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.user?.id);

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
      });
    }

    res.status(STATUS_CODES.NO_CONTENT).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
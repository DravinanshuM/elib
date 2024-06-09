import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

import userModel from "../models/UserModel";

// Middleware for validations for create a user.
const validateUserCreate = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .isLength({ max: 11 }).withMessage('Password must be at least 11 characters long')
];

const userCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //step: 1.  user validation.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return the first error message
    const firstError = errors.array()[0].msg;
    const error = createHttpError(400, firstError);
    return next(error);
  }
  
  //step: 2. Data base call for check user already register or not.
  // 1. check user already exits or not.
  const userExists = await userModel.findOne({ email: email});
  console.log(userExists);

  if(userExists) {
    const error = createHttpError(400, "This email is already exists.");
    return next(error);
  }

  // 2. hashed password.
  const hashedPassword = await bcrypt.hash(password, 10);


  res.status(201).json({
    message: "User created"
  });
};

export { userCreate, validateUserCreate };


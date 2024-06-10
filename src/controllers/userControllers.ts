import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";

import userModel from "../models/UserModel";
import { config } from "../config/config";
import { User } from "../models/UserTypes";

// Middleware for validations for create a user.
const validateUserCreate = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required').bail()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address').bail()
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required').bail()
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long').bail()
    .isLength({ max: 20 }).withMessage('Password must be at most 20 characters long').bail()
    .custom((value) => {
      if (!/(?=.*\d)/.test(value)) {
        throw new Error('Password must contain at least one digit');
      }
      if (!/(?=.*[a-z])/.test(value)) {
        throw new Error('Password must contain at least one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        throw new Error('Password must contain at least one uppercase letter');
      }
      if (!/(?=.*[^a-zA-Z0-9])/.test(value)) {
        throw new Error('Password must contain at least one special character');
      }
      return true;
    }),
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
  try {
    const userExists = await userModel.findOne({ email: email});

    if(userExists) {
      const error = createHttpError(400, "This email is already exists.");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }
  

  // 2. hashed password.
  const hashedPassword = await bcrypt.hash(password, 10);

  // step: 3. create user.
  let userNew: User;
  try {
      userNew = await userModel.create({
      name:name,
      email:email,
      password: hashedPassword
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user."));
  }
 

  // step: 4. token generator.
  try {
    const token = sign({ sub: userNew._id }, config.jwt_secret as string, { 
      expiresIn: "7d",
      algorithm: "HS256"
    });
  
    res.status(201).json({
     accessToken: token
    });
  } catch (error) {
    return next(createHttpError(500, "Error while the jwt token"));
  }
  
};

export { userCreate, validateUserCreate };


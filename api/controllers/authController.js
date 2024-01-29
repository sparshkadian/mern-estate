import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import AppError from '../utils/AppError.js';

export const signup = async (req, res, next) => {
  try {
    let { userName, email, password } = req.body;
    password = bcryptjs.hashSync(password, 10);
    const createNewUser = await User.create({ userName, email, password });
    res.status(201).json({ status: 'success', data: createNewUser });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

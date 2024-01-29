import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import AppError from '../utils/AppError.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(new AppError('User not found', 404));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(new AppError('Incorrect credentials', 401));
    }
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: hashedPassword, ...userInfo } = validUser._doc;

    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      status: 'success',
      userInfo,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

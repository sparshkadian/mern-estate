import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import AppError from '../utils/AppError.js';
import jwt from 'jsonwebtoken';

function generateToken(user, isNew, res) {
  const { password, ...userInfo } = user._doc;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res
    .cookie('access_token', token, { httpOnly: true })
    .status(`${isNew ? 201 : 200}`)
    .json({ status: 'success', userInfo });
}

export const signup = async (req, res, next) => {
  try {
    let { userName, email, password } = req.body;
    password = bcryptjs.hashSync(password, 10);
    const createNewUser = await User.create({ userName, email, password });
    generateToken(createNewUser, true, res);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      return next(new AppError('Both fields are required', 400));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(new AppError('User not found', 404));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(new AppError('Incorrect credentials', 401));
    }
    generateToken(validUser, false, res);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      generateToken(user, false, res);
    } else {
      // 16 character password
      console.log('hello');
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = User.create({
        userName: req.body.name.split(' ').join(''),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      generateToken(newUser, true, res);
    }
  } catch (error) {
    next(error);
  }
};

import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    password = bcryptjs.hashSync(password, 10);
    const createNewUser = await User.create({ userName, email, password });
    res.status(201).json({ message: createNewUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

import AppError from '../utils/AppError.js';
import User from '../models/userModel.js';

export const updateUser = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      return next(new AppError('Forbidden', 403));
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({
      status: 'success',
      userInfo: rest,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      return next(new AppError('You can only delete your own account', 401));
    }
    await User.findByIdAndDelete({ _id: req.params.id });
    res.clearCookie('access_token');
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

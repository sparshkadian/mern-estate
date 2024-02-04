import Listing from '../models/listingModel.js';
import AppError from '../utils/AppError.js';

export const createListing = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      return next(new AppError('Unauthorized', 401));
    }
    const newListing = await Listing.create(req.body);
    return res.status(201).json({
      status: 'success',
      newListing,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.listingId });

    if (req.user._id !== listing.userRef) {
      return next(new AppError('You can only delete your own listing', 401));
    }

    await Listing.findByIdAndDelete({ _id: req.params.listingId });
    res.status(200).json({
      status: 'success',
      message: 'Listing has been deleted',
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

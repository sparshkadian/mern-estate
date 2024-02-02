import Listing from '../models/listingModel.js';
import AppError from '../utils/AppError.js';

export const createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create(req.body);
    return res.status(201).json({
      status: 'success',
      newListing,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

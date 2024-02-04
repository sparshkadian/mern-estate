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

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id });

    if (!listing) {
      return next(new AppError('No Listing Found', 404));
    }

    res.status(200).json({
      status: 'success',
      listing,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findOne({ _id: req.params.listingId });
  if (req.user._id !== listing.userRef) {
    return next(new AppError('You can only delete your own listing', 401));
  }
  try {
    await Listing.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      message: 'Listing has been deleted',
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findOne({ _id: req.params.id });
  if (req.user._id !== listing.userRef) {
    return next(new AppError('You can only update your own listing', 401));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      updatedListing,
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};

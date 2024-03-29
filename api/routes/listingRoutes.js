import express from 'express';
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} from '../controllers/listingController.js';
import { verifyUserToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/create', verifyUserToken, createListing);

router.get('/get/:id', getListing);

router.delete('/delete/:id', verifyUserToken, deleteListing);

router.post('/update/:id', verifyUserToken, updateListing);

export default router;

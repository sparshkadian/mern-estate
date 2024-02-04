import express from 'express';
import {
  createListing,
  deleteListing,
} from '../controllers/listingController.js';
import { verifyUserToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/create', verifyUserToken, createListing);

router.delete('/delete/:listingId', verifyUserToken, deleteListing);

export default router;

import express from 'express';
import {
  updateUser,
  deleteUser,
  getUserListings,
  getUser,
} from '../controllers/userController.js';
import { verifyUserToken } from '../controllers/authController.js';

const router = express.Router();

router.patch('/update/:id', verifyUserToken, updateUser);

router.delete('/delete/:id', verifyUserToken, deleteUser);

router.get('/listings/:id', verifyUserToken, getUserListings);

router.get('/:id', verifyUserToken, getUser);

export default router;

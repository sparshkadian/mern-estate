import express from 'express';
import { updateUser } from '../controllers/userController.js';
import { verifyUserToken } from '../controllers/authController.js';

const router = express.Router();

router.patch('/update/:id', verifyUserToken, updateUser);

export default router;

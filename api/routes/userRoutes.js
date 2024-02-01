import express from 'express';
import { updateUser, deleteUser } from '../controllers/userController.js';
import { verifyUserToken } from '../controllers/authController.js';

const router = express.Router();

router.patch('/update/:id', verifyUserToken, updateUser);

router.delete('/delete/:id', verifyUserToken, deleteUser);

export default router;

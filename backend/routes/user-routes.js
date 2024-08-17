import express from 'express';
import { getAllUsers, getSaltedPassword, verifyPassword } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/salted-password', getSaltedPassword);
router.post('/verify-password', verifyPassword);
router.get('/get-users', getAllUsers);

export default router;

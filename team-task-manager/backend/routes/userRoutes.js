import express from 'express';
import { getMembers } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/members', protect, authorize('admin'), getMembers);

export default router;

import express from 'express';
import {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { taskValidation, statusValidation } from './validators.js';

const router = express.Router();

router.use(protect);

router.get('/my', getMyTasks);
router.get('/all', authorize('admin'), getAllTasks);

router.route('/')
  .post(authorize('admin'), taskValidation, validate, createTask);

router.patch('/:id/status', statusValidation, validate, updateTaskStatus);
router.put('/:id', authorize('admin'), updateTask);
router.delete('/:id', authorize('admin'), deleteTask);

export default router;

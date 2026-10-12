import express from 'express';
import { createProject, getProjects, getProject } from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { projectValidation } from './validators.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getProjects)
  .post(authorize('admin'), projectValidation, validate, createProject);

router.get('/:id', getProject);

export default router;

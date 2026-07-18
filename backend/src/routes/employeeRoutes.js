import { Router } from 'express';
import { createEmployee, listEmployees } from '../controllers/employeeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, listEmployees);
router.post('/', authMiddleware, createEmployee);

export default router;

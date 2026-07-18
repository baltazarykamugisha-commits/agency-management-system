import { Router } from 'express';
import { createCustomer, listCustomers } from '../controllers/customerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, listCustomers);
router.post('/', authMiddleware, createCustomer);

export default router;

import { Router } from 'express';
import { createTransaction, listTransactions } from '../controllers/transactionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, listTransactions);
router.post('/', authMiddleware, createTransaction);

export default router;

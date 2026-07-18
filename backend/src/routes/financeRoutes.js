import { Router } from 'express';
import { createExpense, createIncome, listExpenses, listIncome } from '../controllers/financeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/expenses', authMiddleware, listExpenses);
router.post('/expenses', authMiddleware, createExpense);
router.get('/income', authMiddleware, listIncome);
router.post('/income', authMiddleware, createIncome);

export default router;

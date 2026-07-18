import { Router } from 'express';
import { listSettings, saveSettings } from '../controllers/settingsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, listSettings);
router.post('/', authMiddleware, saveSettings);

export default router;

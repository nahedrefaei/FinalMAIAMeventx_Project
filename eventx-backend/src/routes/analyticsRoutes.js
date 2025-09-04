import { Router } from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { summary, demographics, perEvent, exportCSV, salesTrend } from '../controllers/analyticsController.js';

const router = Router();

router.get('/summary', auth, authorize('admin'), summary);
router.get('/demographics', auth, authorize('admin'), demographics);
router.get('/events/:id', auth, authorize('admin'), perEvent);
router.get('/sales-trend', auth, authorize('admin'), salesTrend);
router.get('/export', auth, authorize('admin'), exportCSV);

export default router;

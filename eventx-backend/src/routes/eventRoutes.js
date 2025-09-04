import { Router } from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { createEvent, updateEvent, deleteEvent, publishEvent, listEvents, getEvent } from '../controllers/eventController.js';

const router = Router();

router.get('/', listEvents);
router.get('/:id', getEvent);

// Admin routes
router.post('/', auth, authorize('admin'), createEvent);
router.put('/:id', auth, authorize('admin'), updateEvent);
router.delete('/:id', auth, authorize('admin'), deleteEvent);
router.post('/:id/publish', auth, authorize('admin'), publishEvent);

export default router;

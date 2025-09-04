import { Router } from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { bookTickets, myTickets, getTicket, checkIn, getAllTickets } from '../controllers/ticketController.js';

const router = Router();

router.post('/book', auth, bookTickets);
router.get('/my', auth, myTickets);
router.get('/:id', auth, getTicket);
router.get("/", auth, authorize("admin"), getAllTickets);
router.post('/check-in', auth, authorize('admin'), checkIn);

export default router;

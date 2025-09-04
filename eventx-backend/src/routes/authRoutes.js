import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { register, login} from '../controllers/authController.js';
import { me, logout } from '../controllers/authController.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me);
router.post('/logout', logout);
 

export default router;

import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getNotificationCount,
  createTestNotification
} from '../controllers/notificationController.js';

const router = Router();

// All routes require authentication
router.use(auth);

// Get notifications for current user
router.get('/', getNotifications);

// Get unread notification count
router.get('/count', getNotificationCount);

// Create test notification (for debugging)
router.post('/test', createTestNotification);

// Mark specific notification as read
router.patch('/:notificationId/read', markAsRead);

// Mark all notifications as read
router.patch('/mark-all-read', markAllAsRead);

// Delete specific notification
router.delete('/:notificationId', deleteNotification);

export default router;

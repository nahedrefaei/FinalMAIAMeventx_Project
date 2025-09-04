import Notification from '../models/Notification.js';
import { getIO } from '../utils/socket.js';

// Create a new notification
export const createNotification = async (notificationData) => {
  try {
    console.log('NotificationController: Creating notification:', notificationData);
    const notification = await Notification.create(notificationData);
    console.log('NotificationController: Notification created in DB:', notification._id);
    
    // Populate user data
    await notification.populate('userId', 'name email');
    console.log('NotificationController: Notification populated with user data');
    
    // Emit real-time notification via Socket.IO
    const io = getIO();
    const roomName = `user_${notification.userId._id}`;
    console.log(`NotificationController: Emitting to room: ${roomName}`);
    
    const notificationPayload = {
      id: notification._id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      data: notification.data,
      priority: notification.priority,
      createdAt: notification.createdAt,
      isRead: notification.isRead
    };
    
    console.log('NotificationController: Emitting notification payload:', notificationPayload);
    io.to(roomName).emit('new_notification', notificationPayload);
    console.log('NotificationController: Notification emitted successfully');
    
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

// Get notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const userId = req.user.id;
    
    const query = { userId };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }
    
    const notifications = await Notification.find(query)
      .populate('data.eventId', 'title date venue')
      .populate('data.ticketId', 'ticketNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const totalNotifications = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ userId, isRead: false });
    
    res.json({
      notifications,
      totalNotifications,
      unreadCount,
      currentPage: page,
      totalPages: Math.ceil(totalNotifications / limit)
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;
    
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Emit update via Socket.IO
    const io = getIO();
    io.to(`user_${userId}`).emit('notification_read', { notificationId });
    
    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Error updating notification', error: error.message });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await Notification.updateMany(
      { userId, isRead: false },
      { isRead: true }
    );
    
    // Emit update via Socket.IO
    const io = getIO();
    io.to(`user_${userId}`).emit('all_notifications_read');
    
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Error updating notifications', error: error.message });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;
    
    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      userId
    });
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Emit update via Socket.IO
    const io = getIO();
    io.to(`user_${userId}`).emit('notification_deleted', { notificationId });
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Error deleting notification', error: error.message });
  }
};

// Get notification count
export const getNotificationCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const unreadCount = await Notification.countDocuments({ userId, isRead: false });
    
    res.json({ unreadCount });
  } catch (error) {
    console.error('Error getting notification count:', error);
    res.status(500).json({ message: 'Error getting notification count', error: error.message });
  }
};

// Test notification creation (for debugging)
export const createTestNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const notification = await createNotification({
      userId,
      type: 'event_reminder',
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working!',
      data: {},
      priority: 'medium'
    });
    
    res.json({ message: 'Test notification created', notification });
  } catch (error) {
    console.error('Error creating test notification:', error);
    res.status(500).json({ message: 'Error creating test notification', error: error.message });
  }
};

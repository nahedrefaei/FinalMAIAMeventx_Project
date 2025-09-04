import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

let io;

export const initSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL?.split(',') || ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Authentication middleware for Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return next(new Error('Authentication token required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.name} connected (${socket.userId})`);
    
    // Join user to their personal room
    socket.join(`user_${socket.userId}`);
    
    // Join admin users to admin room
    if (socket.user.role === 'admin') {
      socket.join('admin_room');
    }

    // Handle joining specific event rooms
    socket.on('join_event', (eventId) => {
      socket.join(`event_${eventId}`);
      console.log(`User ${socket.userId} joined event room: event_${eventId}`);
    });

    // Handle leaving event rooms
    socket.on('leave_event', (eventId) => {
      socket.leave(`event_${eventId}`);
      console.log(`User ${socket.userId} left event room: event_${eventId}`);
    });

    // Handle notification acknowledgment
    socket.on('notification_received', (notificationId) => {
      console.log(`Notification ${notificationId} received by user ${socket.userId}`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.name} disconnected (${socket.userId})`);
    });
  });

  console.log('Socket.IO initialized');
  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

// Utility functions for sending notifications
export const sendNotificationToUser = (userId, notification) => {
  if (io) {
    io.to(`user_${userId}`).emit('new_notification', notification);
  }
};

export const sendNotificationToAdmins = (notification) => {
  if (io) {
    io.to('admin_room').emit('new_notification', notification);
  }
};

export const sendNotificationToEvent = (eventId, notification) => {
  if (io) {
    io.to(`event_${eventId}`).emit('event_notification', notification);
  }
};

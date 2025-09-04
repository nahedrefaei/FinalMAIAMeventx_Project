import React, { createContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../Auth/AuthContext';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const authContext = useAuth();
  
  // Add safety check for auth context
  const user = authContext?.user;
  const token = authContext?.token;
  
  // Environment variables for API URLs
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:8080';

  const fetchNotifications = useCallback(async () => {
    if (!token) {
      console.log('NotificationContext: No token available, skipping fetch');
      return;
    }
    
    console.log('NotificationContext: Fetching notifications with token:', token ? 'Present' : 'Missing');
    
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('NotificationContext: Fetch response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('NotificationContext: Received data:', data);
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      } else {
        console.error('NotificationContext: Failed to fetch notifications. Status:', response.status);
        const errorText = await response.text();
        console.error('NotificationContext: Error response:', errorText);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, [token, API_URL]);

  useEffect(() => {
    if (user && token) {
      console.log('NotificationContext: Initializing Socket.IO connection for user:', user.id || user._id);
      
      // Initialize socket connection
      const socketInstance = io(SOCKET_URL, {
        auth: {
          token
        }
      });

      // Join user's room for personalized notifications
      const userId = user.id || user._id;
      socketInstance.emit('join-room', userId);
      console.log('NotificationContext: Joining room for user:', userId);

      // Listen for new notifications
      socketInstance.on('new_notification', (notification) => {
        console.log('NotificationContext: Received new notification:', notification);
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Show browser notification if permission granted
        if (Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico'
          });
        }
      });

      socketInstance.on('connect', () => {
        console.log('NotificationContext: Connected to Socket.IO server');
      });

      socketInstance.on('disconnect', () => {
        console.log('NotificationContext: Disconnected from Socket.IO server');
      });

      // Fetch existing notifications
      fetchNotifications();

      return () => {
        console.log('NotificationContext: Cleaning up Socket.IO connection');
        socketInstance.disconnect();
      };
    }
  }, [user, token, fetchNotifications, SOCKET_URL]);

  const markAsRead = async (notificationId) => {
    if (!token) return;
    
    try {
      await fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNotifications(prev =>
        prev.map(notification =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    
    try {
      await fetch(`${API_URL}/notifications/mark-all-read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    if (!token) return;
    
    try {
      await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNotifications(prev =>
        prev.filter(notification => notification._id !== notificationId)
      );
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const createTestNotification = async () => {
    if (!token) {
      console.log('NotificationContext: No token for test notification');
      return;
    }
    
    console.log('NotificationContext: Creating test notification...');
    
    try {
      const response = await fetch(`${API_URL}/notifications/test`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('NotificationContext: Test notification response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('NotificationContext: Test notification created successfully:', result);
        // Refresh notifications
        fetchNotifications();
      } else {
        console.error('NotificationContext: Failed to create test notification. Status:', response.status);
        const errorText = await response.text();
        console.error('NotificationContext: Error response:', errorText);
      }
    } catch (error) {
      console.error('Error creating test notification:', error);
    }
  };

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchNotifications,
    createTestNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

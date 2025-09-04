import React, { useState, useEffect, useContext } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  IconButton,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import { NotificationContext } from '../context/NotificationContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
}));

const Notifications = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    fetchNotifications 
  } = useContext(NotificationContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    };
    
    loadNotifications();
  }, [fetchNotifications]);

  const getIcon = (type) => {
    switch (type) {
      case 'event_created':
      case 'upcoming_event':
      case 'event_reminder':
        return <EventIcon sx={{ color: '#C1FF72' }} />;
      case 'payment_received':
        return <PaymentIcon sx={{ color: '#4CAF50' }} />;
      case 'booking_made':
        return <PersonIcon sx={{ color: '#2196F3' }} />;
      default:
        return <NotificationsIcon sx={{ color: '#FF9800' }} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#F44336';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <Typography variant="h4" sx={{ color: '#C1FF72' }}>
          Notifications
        </Typography>
        <Box>
          <Chip 
            label={`${unreadCount} Unread`} 
            color="primary" 
            sx={{ marginRight: 2, backgroundColor: '#C1FF72', color: '#000' }}
          />
          <IconButton 
            onClick={markAllAsRead}
            sx={{ color: '#C1FF72' }}
            title="Mark all as read"
          >
            <MarkEmailReadIcon />
          </IconButton>
        </Box>
      </Box>

      {unreadCount > 0 && (
        <Alert severity="info" sx={{ marginBottom: 2, backgroundColor: '#2196F3', color: '#fff' }}>
          You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </Alert>
      )}

      {/* Notifications List */}
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          Recent Notifications
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#C1FF72' }} />
          </Box>
        ) : notifications.length === 0 ? (
          <Typography sx={{ color: '#aaa', textAlign: 'center', py: 4 }}>
            No notifications yet
          </Typography>
        ) : (
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification._id || notification.id}
                sx={{
                  backgroundColor: notification.isRead ? 'transparent' : 'rgba(193, 255, 114, 0.1)',
                  borderRadius: 1,
                  marginBottom: 1,
                  border: notification.isRead ? 'none' : '1px solid rgba(193, 255, 114, 0.3)'
                }}
                secondaryAction={
                  <Box>
                    {!notification.isRead && (
                      <IconButton
                        edge="end"
                        aria-label="mark as read"
                        onClick={() => markAsRead(notification._id || notification.id)}
                        sx={{ color: '#C1FF72', marginRight: 1 }}
                      >
                        <MarkEmailReadIcon />
                      </IconButton>
                    )}
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteNotification(notification._id || notification.id)}
                      sx={{ color: '#F44336' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>
                  {getIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ component: 'div' }}
                  secondaryTypographyProps={{ component: 'div' }}
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography component="span" variant="body1" sx={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.priority}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(notification.priority),
                          color: '#fff',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" sx={{ color: '#aaa', marginBottom: 0.5, display: 'block' }}>
                        {notification.message}
                      </Typography>
                      <Typography component="span" variant="caption" sx={{ color: '#666', display: 'block' }}>
                        {formatTime(notification.createdAt)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </StyledPaper>
    </Box>
  );
};

export default Notifications;

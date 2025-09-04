import Search from "../../assets/Search.png"
import Notification from "../../assets/Notification.svg"
import EventAccepted from "../../assets/EventAccepted.svg"
import { useAuth } from "../Auth/AuthContext";
import { useNotifications } from "../context/useNotifications";
import { Badge, IconButton, Menu, MenuItem, Typography, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export default function Header() {
    const { user } = useAuth();
    const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const handleNotificationClick = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchor(null);
    };

    const handleMarkAsRead = (notificationId) => {
        markAsRead(notificationId);
    };

    const handleDeleteNotification = (notificationId) => {
        deleteNotification(notificationId);
    };

    const formatNotificationTime = (createdAt) => {
        const now = new Date();
        const notificationTime = new Date(createdAt);
        const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    return(
        <header>
            <div className="w-full h-[70px] sm:h-[91px] bg-[#111111] mt-[5px] rounded-[15px] sm:rounded-[20px] flex items-center justify-between">
                <div className="flex items-center ml-2 sm:ml-[32px] gap-1 sm:gap-[10px]">
                    <div>
                        {user?.role === "admin" ? 
                            <AdminPanelSettingsIcon sx={{ fontSize: { xs: '35px', sm: '50px' }, color: '#fff' }} /> : 
                            <AccountCircleIcon sx={{ fontSize: { xs: '35px', sm: '50px' }, color: '#fff' }} />
                        }
                    </div>
                    <div className="text-white">
                        <h1 className="text-lg sm:text-[30px] font-medium">Welcome</h1>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                            <span className="text-sm sm:text-[30px] font-medium">{user?.name || 'Guest'}</span>
                            <h6 className="text-[8px] sm:text-[10px] opacity-75">{user?.role || ''}</h6>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 sm:gap-[10px]">
                    {/* Search - Hidden on very small screens, visible on sm+ */}
                    <div className="hidden sm:flex w-[200px] md:w-[291px] h-[35px] sm:h-[42px] bg-white rounded-[8px] sm:rounded-[10px] items-center px-2">
                        <button><img src={Search} alt="" className="w-4 h-4 sm:w-auto sm:h-auto"/></button>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="flex-1 outline-none text-sm ml-2"
                        />
                    </div>
                    
                    {/* Enhanced Notification Button */}
                    <div className="w-[35px] h-[35px] sm:w-[42px] sm:h-[42px] bg-white rounded-full flex items-center justify-center">
                        <IconButton onClick={handleNotificationClick} size="small" sx={{ padding: { xs: '4px', sm: '8px' } }}>
                            <Badge badgeContent={unreadCount} color="error">
                                <NotificationsIcon sx={{ color: '#111111', fontSize: { xs: '18px', sm: '24px' } }} />
                            </Badge>
                        </IconButton>
                    </div>

                    {/* Notification Dropdown Menu */}
                    <Menu
                        anchorEl={notificationAnchor}
                        open={Boolean(notificationAnchor)}
                        onClose={handleNotificationClose}
                        PaperProps={{
                            style: {
                                maxHeight: 400,
                                width: window.innerWidth < 640 ? 280 : 350,
                                marginTop: 8,
                                marginRight: window.innerWidth < 640 ? 8 : 0
                            }
                        }}
                    >
                        <div className="p-3 sm:p-4 border-b">
                            <div className="flex justify-between items-center">
                                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                    Notifications
                                </Typography>
                                {unreadCount > 0 && (
                                    <IconButton onClick={markAllAsRead} size="small">
                                        <MarkEmailReadIcon sx={{ fontSize: { xs: '18px', sm: '24px' } }} />
                                    </IconButton>
                                )}
                            </div>
                        </div>

                        {notifications.length === 0 ? (
                            <MenuItem disabled>
                                <Typography variant="body2" color="textSecondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                                    No notifications
                                </Typography>
                            </MenuItem>
                        ) : (
                            notifications.slice(0, 10).map((notification) => (
                                <div key={notification._id}>
                                    <MenuItem 
                                        onClick={() => handleMarkAsRead(notification._id)}
                                        style={{
                                            backgroundColor: notification.isRead ? 'transparent' : '#f5f5f5',
                                            opacity: notification.isRead ? 0.7 : 1,
                                            padding: '8px 16px'
                                        }}
                                    >
                                        <div className="flex-1">
                                            <Typography 
                                                variant="subtitle2" 
                                                component="div"
                                                sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                                            >
                                                {notification.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                color="textSecondary"
                                                sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                                            >
                                                {notification.message}
                                            </Typography>
                                            <Typography 
                                                variant="caption" 
                                                color="textSecondary"
                                                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                                            >
                                                {formatNotificationTime(notification.createdAt)}
                                            </Typography>
                                        </div>
                                        <IconButton 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteNotification(notification._id);
                                            }}
                                            size="small"
                                        >
                                            <DeleteIcon sx={{ fontSize: { xs: '16px', sm: '20px' } }} />
                                        </IconButton>
                                    </MenuItem>
                                    <Divider />
                                </div>
                            ))
                        )}
                    </Menu>
                    
                    <div className="w-[35px] h-[35px] sm:w-[42px] sm:h-[42px] bg-white rounded-full flex items-center justify-center mr-2 sm:mr-[32px]">
                        <button>
                            <img 
                                src={EventAccepted} 
                                alt="" 
                                className="w-4 h-4 sm:w-auto sm:h-auto"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )   
}
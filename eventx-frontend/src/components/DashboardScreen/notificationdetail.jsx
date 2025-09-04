import React from 'react';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function NotificationDetail({notification}) {
    // Get icon based on notification type
    const getIcon = (type) => {
        const iconProps = { 
            sx: { 
                fontSize: { xs: '24px', sm: '36px' }
            }
        };
        
        switch (type) {
            case 'event_created':
            case 'upcoming_event':
            case 'event_reminder':
                return <EventIcon sx={{ ...iconProps.sx, color: '#C1FF72' }} />;
            case 'payment_received':
                return <PaymentIcon sx={{ ...iconProps.sx, color: '#4CAF50' }} />;
            case 'booking_made':
                return <PersonIcon sx={{ ...iconProps.sx, color: '#2196F3' }} />;
            default:
                return <NotificationsIcon sx={{ ...iconProps.sx, color: '#FF9800' }} />;
        }
    };

    // Format time to show relative time
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.ceil(diffTime / (1000 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else {
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return `${diffDays}d ago`;
        }
    };

    return(
        <>
            <hr className="ml-2 sm:ml-[20px] mr-2 sm:mr-[20px]"/>
            <div className="flex items-center justify-start ml-2 sm:ml-[20px] mr-2 sm:mr-[20px] mb-2 sm:mb-[10px] p-1 sm:p-[5px] gap-2 sm:gap-[10px]">
                <div className="ml-1 sm:ml-[5px] flex items-center justify-center w-8 h-8 sm:w-[36px] sm:h-[36px] rounded-full bg-gray-100">
                    {getIcon(notification.type)}
                </div>
                <div className="text-[10px] sm:text-[12px] flex-1 min-w-0">
                    <div className="font-medium truncate">{notification.title}</div>
                    <div className="text-gray-600 text-[8px] sm:text-[10px] truncate">{notification.message}</div>
                    <div className="text-gray-400 text-[8px] sm:text-[10px]">{formatTime(notification.createdAt)}</div>
                </div>
            </div>
        </>
    );
}
  
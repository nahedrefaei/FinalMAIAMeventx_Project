import { createNotification } from '../controllers/notificationController.js';

// Notification templates
const getNotificationTemplate = (type, data) => {
  switch (type) {
    case 'event_created':
      return {
        title: 'New Event Created',
        message: `Event "${data.eventName}" has been created successfully.`,
        priority: 'medium'
      };
    
    case 'booking_made':
      return {
        title: 'New Ticket Booking',
        message: `${data.userName} booked a ticket for "${data.eventName}".`,
        priority: 'high'
      };
    
    case 'upcoming_event':
      return {
        title: 'Upcoming Event Reminder',
        message: `"${data.eventName}" is starting in ${data.timeRemaining}.`,
        priority: 'high'
      };
    
    case 'event_reminder':
      return {
        title: 'Event Reminder',
        message: `Don't forget! "${data.eventName}" is tomorrow at ${data.time}.`,
        priority: 'medium'
      };
    
    case 'payment_received':
      return {
        title: 'Payment Received',
        message: `Payment of $${data.amount} received for "${data.eventName}".`,
        priority: 'medium'
      };
    
    default:
      return {
        title: 'Notification',
        message: 'You have a new notification.',
        priority: 'low'
      };
  }
};

// Create notification for event creation
export const notifyEventCreated = async (userId, eventData) => {
  try {
    const template = getNotificationTemplate('event_created', {
      eventName: eventData.title
    });
    
    await createNotification({
      userId,
      type: 'event_created',
      title: template.title,
      message: template.message,
      priority: template.priority,
      data: {
        eventId: eventData._id,
        additionalInfo: {
          eventTitle: eventData.title,
          eventDate: eventData.date,
          venue: eventData.venue
        }
      }
    });
  } catch (error) {
    console.error('Error creating event notification:', error);
  }
};

// Create notification for booking
export const notifyBookingMade = async (adminUsers, bookingData) => {
  try {
    const template = getNotificationTemplate('booking_made', {
      userName: bookingData.userName,
      eventName: bookingData.eventName
    });
    
    // Notify all admin users
    for (const adminId of adminUsers) {
      await createNotification({
        userId: adminId,
        type: 'booking_made',
        title: template.title,
        message: template.message,
        priority: template.priority,
        data: {
          ticketId: bookingData.ticketId,
          eventId: bookingData.eventId,
          additionalInfo: {
            customerName: bookingData.userName,
            customerEmail: bookingData.userEmail,
            ticketType: bookingData.ticketType,
            amount: bookingData.amount
          }
        }
      });
    }
  } catch (error) {
    console.error('Error creating booking notification:', error);
  }
};

// Create notification for upcoming events
export const notifyUpcomingEvent = async (userIds, eventData, timeRemaining) => {
  try {
    const template = getNotificationTemplate('upcoming_event', {
      eventName: eventData.title,
      timeRemaining
    });
    
    // Notify all users with tickets for this event
    for (const userId of userIds) {
      await createNotification({
        userId,
        type: 'upcoming_event',
        title: template.title,
        message: template.message,
        priority: template.priority,
        data: {
          eventId: eventData._id,
          additionalInfo: {
            eventTitle: eventData.title,
            eventDate: eventData.date,
            venue: eventData.venue,
            timeRemaining
          }
        }
      });
    }
  } catch (error) {
    console.error('Error creating upcoming event notification:', error);
  }
};

// Create notification for payment received
export const notifyPaymentReceived = async (adminUsers, paymentData) => {
  try {
    const template = getNotificationTemplate('payment_received', {
      amount: paymentData.amount,
      eventName: paymentData.eventName
    });
    
    // Notify all admin users
    for (const adminId of adminUsers) {
      await createNotification({
        userId: adminId,
        type: 'payment_received',
        title: template.title,
        message: template.message,
        priority: template.priority,
        data: {
          ticketId: paymentData.ticketId,
          eventId: paymentData.eventId,
          additionalInfo: {
            amount: paymentData.amount,
            customerName: paymentData.customerName,
            paymentMethod: paymentData.paymentMethod
          }
        }
      });
    }
  } catch (error) {
    console.error('Error creating payment notification:', error);
  }
};

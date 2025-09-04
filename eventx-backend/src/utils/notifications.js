import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import { sendMail } from './email.js';

export const sendUpcomingEventReminders = async () => {
  // Find events happening tomorrow
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const dayAfter = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);

  const events = await Event.find({
    date: { $gte: tomorrow, $lt: dayAfter },
    status: 'published'
  });

  for (const ev of events) {
    const tickets = await Ticket.find({ event: ev._id }).populate('user', 'email name');
    for (const tk of tickets) {
      if (tk.user?.email) {
        await sendMail({
          to: tk.user.email,
          subject: `Reminder: ${ev.title} is tomorrow`,
          html: `<p>Hi ${tk.user.name || 'there'},</p>
                 <p>This is a reminder for <b>${ev.title}</b> at <b>${ev.venue}</b> on <b>${ev.date.toLocaleString()}</b>.</p>
                 <p>Seat: ${tk.seatNumber}</p>
                 <p>See you there!</p>`
        });
      }
    }
  }
};

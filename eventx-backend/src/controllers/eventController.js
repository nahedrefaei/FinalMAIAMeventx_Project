import { StatusCodes } from 'http-status-codes';
import Event from '../models/Event.js';
import User from '../models/User.js';
import { eventSchema } from '../utils/validators.js';
import { paginate } from '../utils/pagination.js';
import { createNotification } from './notificationController.js';

const buildSeats = (total) => {
  // Simple seat labels: A1..A10, B1.. etc.
  const seats = [];
  const perRow = 10;
  const rows = Math.ceil(total / perRow);
  for (let r = 0; r < rows; r++) {
    const rowLabel = String.fromCharCode(65 + r); // A, B, C...
    for (let i = 1; i <= perRow; i++) {
      const idx = r * perRow + i;
      if (idx > total) break;
      seats.push({ number: `${rowLabel}${i}`, isBooked: false });
    }
  }
  return seats;
};

export const createEvent = async (req, res) => {
  try {
    console.log('EventController: Creating event with data:', req.body);
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    
    const seats = buildSeats(value.totalSeats);
    const ev = await Event.create({ ...value, seats, createdBy: req.user._id });
    console.log('EventController: Event created successfully:', ev._id);
    
    // Create notifications for all users about the new event
    const users = await User.find({}, '_id');
    console.log(`EventController: Creating notifications for ${users.length} users`);
    
    const notificationPromises = users.map(user => 
      createNotification({
        userId: user._id,
        type: 'event_created',
        title: 'New Event Available!',
        message: `A new event "${value.title}" has been created. Check it out!`,
        data: {
          eventId: ev._id,
          eventTitle: value.title,
          eventDate: value.date,
          eventPrice: value.price
        },
        priority: 'medium'
      })
    );
    
    // Create notifications in parallel
    await Promise.all(notificationPromises);
    console.log('EventController: All notifications created successfully');
    
    res.status(StatusCodes.CREATED).json({ event: ev });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating event' });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { error, value } = eventSchema.fork(['totalSeats','date'], (s)=>s.optional()).validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  const ev = await Event.findById(id);
  if (!ev) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
  Object.assign(ev, value);
  // If totalSeats increased, add more seats (cannot shrink to avoid orphans)
  if (value.totalSeats && value.totalSeats > ev.seats.length) {
    const extra = value.totalSeats - ev.seats.length;
    const newSeats = ev.seats.concat(buildSeats(value.totalSeats)).slice(ev.seats.length, ev.seats.length + extra);
    ev.seats.push(...newSeats);
  }
  await ev.save();
  res.status(StatusCodes.OK).json({ event: ev });
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const ev = await Event.findByIdAndDelete(id);
  if (!ev) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
  res.status(StatusCodes.OK).json({ message: 'Deleted' });
};

export const publishEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const ev = await Event.findById(id);
    if (!ev) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
    
    ev.status = 'published';
    await ev.save();
    
    // Create notifications for all users about the published event
    const users = await User.find({}, '_id');
    const notificationPromises = users.map(user => 
      createNotification({
        userId: user._id,
        type: 'upcoming_event',
        title: 'Event Now Live!',
        message: `"${ev.title}" is now live and ready for booking!`,
        data: {
          eventId: ev._id,
          eventTitle: ev.title,
          eventDate: ev.date,
          eventPrice: ev.price
        },
        priority: 'high'
      })
    );
    
    // Create notifications in parallel
    await Promise.all(notificationPromises);
    
    res.status(StatusCodes.OK).json({ event: ev });
  } catch (error) {
    console.error('Error publishing event:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error publishing event' });
  }
};

export const listEvents = async (req, res) => {
  const { q, status, from, to, minPrice, maxPrice, sort = '-date' } = req.query;
  const { skip, limit, page } = paginate(req.query.page, req.query.limit);
  const filter = {};
  if (q) filter.title = { $regex: q, $options: 'i' };
  if (status) filter.status = status;
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  const [items, total] = await Promise.all([
    Event.find(filter).sort(sort).skip(skip).limit(limit),
    Event.countDocuments(filter)
  ]);
  res.status(StatusCodes.OK).json({ page, total, items });
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  const ev = await Event.findById(id);
  if (!ev) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Event not found' });
  const available = ev.seats.filter(s => !s.isBooked).length;
  res.status(StatusCodes.OK).json({ event: ev, availableSeats: available });
};

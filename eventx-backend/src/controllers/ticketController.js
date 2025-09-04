import { StatusCodes } from 'http-status-codes';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import { bookingSchema } from '../utils/validators.js';
import { signQRToken, verifyQRToken } from '../utils/jwt.js';
import { generateQRCodeDataURL } from '../utils/qrcode.js';
import { sendMail } from '../utils/email.js';

export const bookTickets = async (req, res) => {
  const { error, value } = bookingSchema.validate(req.body);
  if (error) return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });

  const ev = await Event.findById(value.eventId);
  if (!ev || ev.status !== 'published') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Event not available for booking' });
  }

  const requested = value.seats;
  // Ensure seats exist and are free
  const seatMap = new Map(ev.seats.map(s => [s.number, s]));
  for (const sn of requested) {
    const s = seatMap.get(sn);
    if (!s) return res.status(StatusCodes.BAD_REQUEST).json({ message: `Seat ${sn} does not exist` });
    if (s.isBooked) return res.status(StatusCodes.BAD_REQUEST).json({ message: `Seat ${sn} is already booked` });
  }

  // Simulate payment
  const total = requested.length * ev.price;
  // In real life integrate Stripe/Paymob/etc.
  const paymentStatus = 'paid';

  // Book seats & create tickets
  const tickets = [];
  for (const sn of requested) {
    seatMap.get(sn).isBooked = true;
    const qrToken = signQRToken(`TKT-${Date.now()}-${sn}-${req.user._id}`);
    const ticket = await Ticket.create({
      event: ev._id,
      user: req.user._id,
      seatNumber: sn,
      pricePaid: ev.price,
      qrToken,
      paymentStatus
    });
    tickets.push(ticket);
  }
  ev.popularity += requested.length;
  await ev.save();

  // Generate QR images + email
  const results = [];
  for (const t of tickets) {
    const qrImage = await generateQRCodeDataURL(t.qrToken);
    results.push({
      id: t._id,
      event: t.event,
      seatNumber: t.seatNumber,
      qrImage
    });
    try {
      await sendMail({
        to: req.user.email,
        subject: `Your Ticket for ${ev.title} — Seat ${t.seatNumber}`,
        html: `<p>Thanks for your booking!</p>
               <p>Event: <b>${ev.title}</b> at <b>${ev.venue}</b> on <b>${ev.date.toLocaleString()}</b></p>
               <p>Seat: <b>${t.seatNumber}</b></p>
               <p><img src="${qrImage}" alt="QR" /></p>`
      });
    } catch {}
  }

  res.status(StatusCodes.CREATED).json({ tickets: results, totalPaid: total });
};

export const myTickets = async (req, res) => {
  const items = await Ticket.find({ user: req.user._id })
    .populate('event', 'title date venue')
    .sort('-createdAt');
  res.status(StatusCodes.OK).json({ items });
};

export const getTicket = async (req, res) => {
  const { id } = req.params;
  const tk = await Ticket.findById(id).populate('event', 'title date venue');
  if (!tk) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ticket not found' });
  if (req.user.role !== 'admin' && tk.user.toString() !== req.user._id.toString()) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  }
  res.status(StatusCodes.OK).json({ ticket: tk });
};
// =====================
// Get ALL tickets (Admin only)
// =====================
export const getAllTickets = async (req, res) => {
  try {
    const items = await Ticket.find()
      .populate("user", "name email")   // show user info
      .populate("event", "title date venue") // show event info
      .sort("-createdAt");

    res.status(StatusCodes.OK).json({ items });
  } catch (err) {
    console.error("❌ Failed to fetch all tickets", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to fetch tickets" });
  }
};

export const checkIn = async (req, res) => {
  const { token } = req.body; // qrToken from QR scanner
  try {
    const payload = verifyQRToken(token);
    const tk = await Ticket.findOne({ qrToken: token }).populate('event', 'title date venue');
    if (!tk) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Ticket not found' });
    if (tk.checkedIn) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Already checked in' });
    tk.checkedIn = true;
    await tk.save();
    res.status(StatusCodes.OK).json({ message: 'Check-in successful', ticket: tk });
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid QR token' });
  }
};

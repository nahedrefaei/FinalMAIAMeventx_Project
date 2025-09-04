import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seatNumber: { type: String, required: true },
  pricePaid: { type: Number, required: true },
  qrToken: { type: String, required: true }, // signed token encoded in QR
  checkedIn: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ['paid', 'refunded'], default: 'paid' }
}, { timestamps: true });

export default mongoose.model('Ticket', TicketSchema);

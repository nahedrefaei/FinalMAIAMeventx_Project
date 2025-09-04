import mongoose from 'mongoose';

const SeatSchema = new mongoose.Schema({
  number: { type: String, required: true },   // e.g., "A1", "B12"
  isBooked: { type: Boolean, default: false }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  price: { type: Number, default: 0 },
  totalSeats: { type: Number, required: true, min: 1 },
  seats: [SeatSchema],
  status: { type: String, enum: ['draft', 'published', 'closed'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  popularity: { type: Number, default: 0 } // simple counter: tickets booked
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);

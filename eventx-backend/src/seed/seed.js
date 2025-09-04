import 'dotenv/config';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Event from '../models/Event.js';

const buildSeats = (total) => {
  const seats = [];
  const perRow = 10;
  const rows = Math.ceil(total / perRow);
  for (let r = 0; r < rows; r++) {
    const rowLabel = String.fromCharCode(65 + r);
    for (let i = 1; i <= perRow; i++) {
      const idx = r * perRow + i;
      if (idx > total) break;
      seats.push({ number: `${rowLabel}${i}`, isBooked: false });
    }
  }
  return seats;
};

const run = async () => {
  await connectDB(process.env.MONGODB_URI);
  await Promise.all([User.deleteMany({}), Event.deleteMany({})]);

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@eventx.local',
    password: 'Admin@123',
    role: 'admin',
    age: 30, gender: 'other', location: 'Cairo', interests: ['tech','music']
  });
  const user = await User.create({
    name: 'User',
    email: 'user@eventx.local',
    password: 'User@123',
    role: 'user',
    age: 24, gender: 'female', location: 'Alexandria', interests: ['sports','music']
  });

  const now = new Date();
  const events = await Event.insertMany([
    {
      title: 'Web Dev Summit 2025',
      description: 'A summit for modern web developers.',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 10, 0, 0),
      venue: 'Cairo Expo Center',
      price: 200,
      totalSeats: 45,
      seats: buildSeats(45),
      status: 'published',
      createdBy: admin._id
    },
    {
      title: 'Design Thinking Workshop',
      description: 'Hands-on UX workshop.',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 9, 30, 0),
      venue: 'Alexandria Hub',
      price: 120,
      totalSeats: 30,
      seats: buildSeats(30),
      status: 'draft',
      createdBy: admin._id
    }
  ]);

  console.log('Seed complete:', { admin: admin.email, user: user.email, events: events.length });
  process.exit(0);
};

run().catch(e => { console.error(e); process.exit(1); });

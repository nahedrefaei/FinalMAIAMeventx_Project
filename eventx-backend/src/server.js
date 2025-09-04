import 'dotenv/config';
import { createServer } from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import cron from 'node-cron';
import { sendUpcomingEventReminders } from './utils/notifications.js';
import { initSocketIO } from './utils/socket.js';

const PORT = process.env.PORT || 8080;

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  
  // Create HTTP server
  const server = createServer(app);
  
  // Initialize Socket.IO
  initSocketIO(server);
  
  server.listen(PORT, () => {
    console.log(`EventX API running on http://localhost:${PORT}`);
    console.log(`Socket.IO enabled for real-time notifications`);
  });

  // Demo cron: run every day at 09:00 server time
  cron.schedule('0 9 * * *', async () => {
    try {
      await sendUpcomingEventReminders();
    } catch (e) {
      console.error('Reminder cron failed:', e.message);
    }
  });
};

start();
